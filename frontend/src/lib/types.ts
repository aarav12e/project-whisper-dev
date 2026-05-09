export interface Patient {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  contact_number?: string;
  address?: string;
  village?: string;
  gps_latitude?: number;
  gps_longitude?: number;
  photo_url?: string;
  medical_history?: string;
  family_details?: string;
  is_pregnant: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Visit {
  id: string;
  patient_name: string;
  visit_date: string;
  chief_complaint?: string;
  symptoms?: string;
  treatment_given?: string;
  referral_required: boolean;
  referral_details?: string;
  follow_up_date?: string;
  status: string;
  voice_notes_url?: string;
  photos?: string;
  gps_latitude?: number;
  gps_longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vaccination {
  id: string;
  patient_name: string;
  vaccine_name: string;
  batch_number?: string;
  due_date: string;
  administered_date?: string;
  status: string;
  next_due_date?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AncRecord {
  id: string;
  patient_id: string;
  visit_number: number;
  visit_date: string;
  weeks_pregnant?: number;
  weight_kg?: number;
  blood_pressure?: string;
  hemoglobin?: number;
  risk_factors?: string;
  complications?: string;
  next_visit_date?: string;
  delivery_date_estimate?: string;
  createdAt?: string;
  updatedAt?: string;
}
