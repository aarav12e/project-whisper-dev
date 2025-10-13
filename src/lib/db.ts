import { openDB, IDBPDatabase } from 'idb';

export interface PatientRecord {
  id: string;
  created_by: string;
  full_name: string;
  age: number;
  gender: string;
  contact_number?: string;
  address?: string;
  village?: string;
  gps_latitude?: number;
  gps_longitude?: number;
  photo_url?: string;
  medical_history?: any;
  family_details?: any;
  is_pregnant: boolean;
  created_at: string;
  updated_at: string;
  synced_at?: string;
  _pending_sync: boolean;
}

export interface VisitRecord {
  id: string;
  patient_id: string;
  created_by: string;
  visit_date: string;
  chief_complaint?: string;
  symptoms?: any;
  treatment_given?: string;
  referral_required: boolean;
  referral_details?: string;
  follow_up_date?: string;
  status: string;
  voice_notes_url?: string;
  photos?: any;
  gps_latitude?: number;
  gps_longitude?: number;
  created_at: string;
  updated_at: string;
  synced_at?: string;
  _pending_sync: boolean;
}

export interface VaccinationRecord {
  id: string;
  patient_id: string;
  administered_by: string;
  vaccine_name: string;
  batch_number?: string;
  due_date: string;
  administered_date?: string;
  status: string;
  next_due_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  synced_at?: string;
  _pending_sync: boolean;
}

export interface ANCRecord {
  id: string;
  patient_id: string;
  created_by: string;
  visit_number: number;
  visit_date: string;
  weeks_pregnant?: number;
  weight_kg?: number;
  blood_pressure?: string;
  hemoglobin?: number;
  risk_factors?: any;
  complications?: string;
  next_visit_date?: string;
  delivery_date_estimate?: string;
  created_at: string;
  updated_at: string;
  synced_at?: string;
  _pending_sync: boolean;
}

const DB_NAME = 'eoasha-db';
const DB_VERSION = 1;

type StoreName = 'patients' | 'visits' | 'vaccinations' | 'anc_records' | 'sync_queue';

let dbInstance: IDBPDatabase | null = null;

export async function getDB(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Patients store
      if (!db.objectStoreNames.contains('patients')) {
        const patientStore = db.createObjectStore('patients', { keyPath: 'id' });
        patientStore.createIndex('by-sync', '_pending_sync');
      }

      // Visits store
      if (!db.objectStoreNames.contains('visits')) {
        const visitStore = db.createObjectStore('visits', { keyPath: 'id' });
        visitStore.createIndex('by-patient', 'patient_id');
        visitStore.createIndex('by-sync', '_pending_sync');
      }

      // Vaccinations store
      if (!db.objectStoreNames.contains('vaccinations')) {
        const vaccineStore = db.createObjectStore('vaccinations', { keyPath: 'id' });
        vaccineStore.createIndex('by-patient', 'patient_id');
        vaccineStore.createIndex('by-sync', '_pending_sync');
        vaccineStore.createIndex('by-status', 'status');
      }

      // ANC records store
      if (!db.objectStoreNames.contains('anc_records')) {
        const ancStore = db.createObjectStore('anc_records', { keyPath: 'id' });
        ancStore.createIndex('by-patient', 'patient_id');
        ancStore.createIndex('by-sync', '_pending_sync');
      }

      // Sync queue store
      if (!db.objectStoreNames.contains('sync_queue')) {
        db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return dbInstance;
}

// Generic CRUD operations
export async function saveToLocal(
  storeName: StoreName,
  data: any
): Promise<void> {
  const db = await getDB();
  await db.put(storeName, data);
}

export async function getFromLocal(
  storeName: StoreName,
  key: string
): Promise<any> {
  const db = await getDB();
  return await db.get(storeName, key);
}

export async function getAllFromLocal(
  storeName: StoreName
): Promise<any[]> {
  const db = await getDB();
  return await db.getAll(storeName);
}

export async function deleteFromLocal(
  storeName: StoreName,
  key: string
): Promise<void> {
  const db = await getDB();
  await db.delete(storeName, key);
}

export async function getPendingSync(
  storeName: StoreName
): Promise<any[]> {
  const db = await getDB();
  if (storeName === 'sync_queue') return [];
  const tx = db.transaction(storeName, 'readonly');
  const index = tx.store.index('by-sync');
  const results = await index.getAll();
  return results.filter((item: any) => item._pending_sync === true);
}

export async function clearStore(
  storeName: StoreName
): Promise<void> {
  const db = await getDB();
  await db.clear(storeName);
}
