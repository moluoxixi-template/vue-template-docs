import { BaseApi } from '~/utils/api'
import {
  Appointment,
  AppointmentListResponse,
  AppointmentDetailResponse,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from '../models/appointment'

export class AppointmentService extends BaseApi {
  constructor() {
    super('/api/appointments')
  }

  /**
   * 获取预约列表
   * @param page 页码
   * @param limit 每页条数
   * @param status 预约状态过滤
   * @param doctorId 医生ID过滤
   * @param patientId 患者ID过滤
   * @param date 日期过滤
   */
  async getAppointments(
    page: number = 1,
    limit: number = 10,
    filters: {
      status?: string
      doctorId?: number
      patientId?: number
      date?: string
    } = {},
  ): Promise<AppointmentListResponse> {
    let query = `?page=${page}&limit=${limit}`

    // 添加筛选条件
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        query += `&${key}=${encodeURIComponent(String(value))}`
      }
    })

    return this.get<AppointmentListResponse>(query)
  }

  /**
   * 根据ID获取预约详情
   * @param id 预约ID
   */
  async getAppointmentById(id: number): Promise<AppointmentDetailResponse> {
    return this.get<AppointmentDetailResponse>(`/${id}`)
  }

  /**
   * 创建新预约
   * @param appointmentData 预约数据
   */
  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    return this.post<Appointment>('', appointmentData)
  }

  /**
   * 更新预约信息
   * @param id 预约ID
   * @param appointmentData 更新的预约数据
   */
  async updateAppointment(
    id: number,
    appointmentData: UpdateAppointmentRequest,
  ): Promise<Appointment> {
    return this.put<Appointment>(`/${id}`, appointmentData)
  }

  /**
   * 取消预约
   * @param id 预约ID
   * @param reason 取消原因
   */
  async cancelAppointment(id: number, reason?: string): Promise<Appointment> {
    return this.put<Appointment>(`/${id}/cancel`, { reason })
  }

  /**
   * 获取医生的可用时间段
   * @param doctorId 医生ID
   * @param date 日期
   */
  async getDoctorAvailability(doctorId: number, date: string): Promise<string[]> {
    return this.get<string[]>(`/availability?doctorId=${doctorId}&date=${date}`)
  }
}
