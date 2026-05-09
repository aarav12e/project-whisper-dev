import type { Patient, Visit, Vaccination, AncRecord } from './types';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(errorDetail || response.statusText);
  }
  return response.json();
};

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return handleResponse<T>(response);
};

export const api = {
  patients: {
    list: async (): Promise<Patient[]> => request<Patient[]>('/api/patients'),
    get: async (id: string): Promise<Patient> => request<Patient>(`/api/patients/${id}`),
    create: async (input: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> =>
      request<Patient>('/api/patients', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  },
  visits: {
    list: async (): Promise<Visit[]> => request<Visit[]>('/api/visits'),
    create: async (input: Omit<Visit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Visit> =>
      request<Visit>('/api/visits', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  },
  vaccinations: {
    list: async (): Promise<Vaccination[]> => request<Vaccination[]>('/api/vaccinations'),
    create: async (input: Omit<Vaccination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vaccination> =>
      request<Vaccination>('/api/vaccinations', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  },
  ancRecords: {
    list: async (): Promise<AncRecord[]> => request<AncRecord[]>('/api/anc-records'),
    create: async (input: Omit<AncRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<AncRecord> =>
      request<AncRecord>('/api/anc-records', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
  },
};
