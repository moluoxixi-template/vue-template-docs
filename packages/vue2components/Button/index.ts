import Button from './src/index.vue'

// 导出组件
export default Button

// 用于Vue插件形式注册
export function install(Vue) {
  Vue.component('MButton', Button)
}
