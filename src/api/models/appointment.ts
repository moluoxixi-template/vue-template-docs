export interface Appointment {
  id: number
  patientId: number
  patientName: string
  doctorId: number
  doctorName: string
  department: string
  date: string
  timeSlot: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentListResponse {
  appointments: Appointment[]
  total: number
  page: number
  limit: number
}

export interface AppointmentDetailResponse {
  appointment: Appointment
}

export interface CreateAppointmentRequest {
  patientId: number
  doctorId: number
  department: string
  date: string
  timeSlot: string
  notes?: string
}

export interface UpdateAppointmentRequest {
  status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  date?: string
  timeSlot?: string
  notes?: string
}
