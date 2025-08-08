import type { App } from 'vue'

// 导入组件
import Button from './Button'

// 导出组件
export {
  Button
}

// 导出默认对象，用于Vue插件形式注册
export default {
  install(app: App) {
    // 注册组件
    app.component('MButton', Button)
  }
}
