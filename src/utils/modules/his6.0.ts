import CryptoJS from 'crypto-js'

export const utils = {
  uuid(num:any) {
    let i
    const s = []
    const hexDigits = '0123456789abcdef'
    if (num) {
      let n = ''
      for (i = 0; i < num; i++) {
        n = n + 'x'
      }
      return n.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
    for (i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = ''
    return s.join('')
  },
  /**
   *
   * @param {string} key 从数组对象里面要提取的key值
   * @param {Array[object]} list 数组对象集合
   * @param {string} targetKey 目标集合所映射的key值
   * @param {Array[object]} targetList 目标集合
   */
  getKeyList(key, list, targetKey, targetList) {
    return targetList.map((value) => {
      const option = list.find((item) => item[targetKey] == value)
      return option ? option[key] : null
    })
  },
  debounce(fn, delay = 300) {
    //默认300毫秒
    let timer

    return function () {
      const args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args) // 改变this指向为调用debounce所指的对象
      }, delay)
    }
  },
}

export function addSign(config) {
  const appId = sessionStorage.getItem('appId') || 'trasen'
  let encrypted = {
    appId,
    randomStr: utils.uuid(6),
    timestamp: new Date().getTime(),
    version: 'V1.0.0',
  }
  const queryString = Object.entries(encrypted)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
  const finalString = `${queryString}&${sessionStorage.getItem('hisSignatureKey') || 'e1ec93ae-e25f-434d-8a64-f70116430a33'}`
  const signature = CryptoJS.MD5(finalString).toString()
  encrypted.sign = signature.toUpperCase()
  Object.keys(encrypted).forEach((key) => {
    config.headers[key] = encrypted[key]
  })
}
