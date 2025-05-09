/*
 * @Author: moluoxixi 1983531544@qq.com
 * @Date: 2025-05-01 18:21:02
 * @LastEditors: moluoxixi 1983531544@qq.com
 * @LastEditTime: 2025-05-01 18:41:48
 * @FilePath: \clinicDoctor\api\services\user-service.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { BaseApi } from '@/api/utils'
import type {
  User,
  UserListResponse,
  UserDetailResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/api/models/user'

export class UserService extends BaseApi {
  constructor() {
    // 使用特定的用户API基础URL
    super('/api/users')
  }

  /**
   * 获取用户列表
   * @param page 页码
   * @param limit 每页条数
   * @param search 搜索关键词
   */
  async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<UserListResponse> {
    let query = `?page=${page}&limit=${limit}`
    if (search) {
      query += `&search=${encodeURIComponent(search)}`
    }
    return this.get<UserListResponse>(query)
  }

  /**
   * 根据ID获取用户详情
   * @param id 用户ID
   */
  async getUserById(id: number): Promise<UserDetailResponse> {
    return this.get<UserDetailResponse>(`/${id}`)
  }

  /**
   * 创建新用户
   * @param userData 用户数据
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    return this.post<User>('', userData)
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param userData 更新的用户数据
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    return this.put<User>(`/${id}`, userData)
  }

  /**
   * 删除用户
   * @param id 用户ID
   */
  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`/${id}`)
  }
}
