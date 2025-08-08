import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'

// Vue 2不支持直接修改组件属性，这里简化实现
export function modifyComponents(
  Vue: any,
  components: any[],
  modifier = (v: any) => v,
) {
  // Vue 2环境下这个功能不可用，这里仅保留函数签名
  console.warn('modifyComponents is not fully supported in Vue 2')
}
