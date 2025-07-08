import type { PasswordVerifyOptions } from './src/index'
import Dialog from './src/index.vue'
import DialogAPI from './src/index'

// 为了TypeScript支持
export type { PasswordVerifyOptions }

export { Dialog, DialogAPI }
// 默认导出API函数
export default Dialog
