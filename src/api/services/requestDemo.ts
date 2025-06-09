import { userRequest } from '@/common/api/utils/index'

export function getUserList(data: any) {
  return userRequest({
    url: '/user',
    method: 'get',
    params: data,
  })
}
