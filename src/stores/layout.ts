import { defineStore } from 'pinia'
import store from '@/stores/index.ts'

/**
 * 主题存储
 * @returns {Object} 主题存储对象
 */
const layoutStore = defineStore('layout', {
  state: () => ({
    /**
     * 布局
     * @type {string}
     */
    layout: 'element'
  }),
  actions: {
    setLayout(layout: string) {
      // 将当前的主题颜色设置为传入的颜色
      this.layout = layout
    }
  }
})

export function useLayoutStore() {
  return layoutStore(store)
}
