export interface User {
  id: number
  name: string
  email: string
  phone?: string
  avatar?: string
  role: 'admin' | 'doctor' | 'nurse' | 'patient'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

export interface UserDetailResponse {
  user: User
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone?: string
  role: 'admin' | 'doctor' | 'nurse' | 'patient'
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  status?: 'active' | 'inactive'
  avatar?: string
}
