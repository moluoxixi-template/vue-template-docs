import type { DialogOptions } from './src/index'
import Dialog from './src/index.vue'
import DialogAPI from './src/index'

// 为了TypeScript支持
export type { DialogOptions }

export { Dialog, DialogAPI }
// 默认导出API函数
export default Dialog
