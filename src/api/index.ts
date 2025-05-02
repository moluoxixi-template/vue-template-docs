// 导出所有模型
export * from './models'

// 导出所有服务
export * from './services'

// 创建服务实例工厂
import { UserService, PatientService, AppointmentService } from './services'

// API服务单例
const userService = new UserService()
const patientService = new PatientService()
const appointmentService = new AppointmentService()

// 服务集合
export const services = {
  user: userService,
  patient: patientService,
  appointment: appointmentService,
}

// 导出API服务的Composition API函数
export function useUserService() {
  return userService
}

export function usePatientService() {
  return patientService
}

export function useAppointmentService() {
  return appointmentService
}
