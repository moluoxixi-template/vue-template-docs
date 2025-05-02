export interface Patient {
  id: number
  name: string
  gender: 'male' | 'female' | 'other'
  age: number
  phone?: string
  address?: string
  idCard: string
  medicalHistory?: string[]
  allergies?: string[]
  createdAt: string
  updatedAt: string
}

export interface PatientListResponse {
  patients: Patient[]
  total: number
  page: number
  limit: number
}

export interface PatientDetailResponse {
  patient: Patient
}

export interface CreatePatientRequest {
  name: string
  gender: 'male' | 'female' | 'other'
  age: number
  phone?: string
  address?: string
  idCard: string
  medicalHistory?: string[]
  allergies?: string[]
}

export interface UpdatePatientRequest {
  name?: string
  phone?: string
  address?: string
  medicalHistory?: string[]
  allergies?: string[]
}
