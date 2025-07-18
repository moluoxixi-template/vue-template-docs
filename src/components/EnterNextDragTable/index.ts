import EnterNextDragTable from './src/index.vue'
import Example from './src/Example.vue'
import type { App } from 'vue'

// 导出组件
export default EnterNextDragTable
export { Example }

// 用于Vue插件形式注册
export function install(app: App) {
  app.component('EnterNextDragTable', EnterNextDragTable)
}
