import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export class BaseApi {
  protected baseURL: string
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  protected async request<R>(config: AxiosRequestConfig): Promise<R> {
    const instance = axios.create({ baseURL: this.baseURL })
    const response = await instance.request<R>(config)
    return response.data
  }
  public get<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.request<R>({ ...config, url, method: 'get' })
  }
  public post<R>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.request<R>({ ...config, url, method: 'post', data })
  }
  public delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.request<R>({ ...config, url, method: 'delete' })
  }
  public put<R>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.request<R>({ ...config, url, method: 'put', data })
  }
}
