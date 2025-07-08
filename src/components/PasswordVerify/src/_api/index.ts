import request from '@/utils/request.js'
import requestSSO from '@/utils/sso'
// 账号密码校验
export function verifyPassword(data: any) {
  return requestSSO({
    url: '/verifyPassword',
    method: 'post',
    data,
  })
}

/**
 * @description: 查询人员字典
 * @param {Array} codes  查询员工编码集合
 * @return {*}
 */
export function queryMember(codes: string[]) {
  return request.post('/ts-pfs-nur-ipt/queryMember', {
    isGetMemberProperty: '1',
    isGetMemberDept: '1',
    pageIndex: 1,
    pageSize: 10,
    codes,
  })
}
