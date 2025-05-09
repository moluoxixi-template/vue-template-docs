import { BaseApi } from '../utils'

export interface User {
  id: number
  name: string
  email: string
}

export interface CreateUserDto {
  name: string
  email: string
}

export class UserApi extends BaseApi {
  constructor() {
    super('/api/users')
  }

  async getUsers(): Promise<User[]> {
    return this.get<User[]>('')
  }

  async getUserById(id: number): Promise<User> {
    return this.get<User>(`/${id}`)
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.post<User>('', data)
  }

  async updateUser(id: number, data: Partial<CreateUserDto>): Promise<User> {
    return this.put<User>(`/${id}`, data)
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete(`/${id}`)
  }
}
