import ExportExcel from './src/index.vue'
import type { App } from 'vue'
import Example from './src/Example.vue'

// 导出组件
export default ExportExcel
export { Example }

// 用于Vue插件形式注册
export function install(app: App) {
  app.component('ExportExcel', ExportExcel)
}
