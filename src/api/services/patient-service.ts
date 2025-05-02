import { BaseApi } from '~/utils/api'
import {
  Patient,
  PatientListResponse,
  PatientDetailResponse,
  CreatePatientRequest,
  UpdatePatientRequest,
} from '../models/patient'

export class PatientService extends BaseApi {
  constructor() {
    // 使用特定的患者API基础URL
    super('/api/patients')
  }

  /**
   * 获取患者列表
   * @param page 页码
   * @param limit 每页条数
   * @param search 搜索关键词
   */
  async getPatients(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<PatientListResponse> {
    let query = `?page=${page}&limit=${limit}`
    if (search) {
      query += `&search=${encodeURIComponent(search)}`
    }
    return this.get<PatientListResponse>(query)
  }

  /**
   * 根据ID获取患者详情
   * @param id 患者ID
   */
  async getPatientById(id: number): Promise<PatientDetailResponse> {
    return this.get<PatientDetailResponse>(`/${id}`)
  }

  /**
   * 创建新患者
   * @param patientData 患者数据
   */
  async createPatient(patientData: CreatePatientRequest): Promise<Patient> {
    return this.post<Patient>('', patientData)
  }

  /**
   * 更新患者信息
   * @param id 患者ID
   * @param patientData 更新的患者数据
   */
  async updatePatient(id: number, patientData: UpdatePatientRequest): Promise<Patient> {
    return this.put<Patient>(`/${id}`, patientData)
  }

  /**
   * 删除患者
   * @param id 患者ID
   */
  async deletePatient(id: number): Promise<void> {
    return this.delete<void>(`/${id}`)
  }

  /**
   * 获取患者的医疗记录
   * @param id 患者ID
   */
  async getPatientMedicalHistory(id: number): Promise<any[]> {
    return this.get<any[]>(`/${id}/history`)
  }
}
