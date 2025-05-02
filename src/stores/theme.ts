import { defineStore } from 'pinia'
import store from '@/stores/index.ts'

/**
 * 主题存储
 * @returns {Object} 主题存储对象
 */
const themeStore = defineStore('theme',{
  state: () => ({
    /**
     * 主题颜色
     * @type {string}
     */
    themeColor: '#3a77ff'
  }),
  actions: {
    /**
     * 设置主题颜色
     * @param {string} color - 新的主题颜色
     */
    setTheme(color:string) {
      // 将当前的主题颜色设置为传入的颜色
      this.themeColor = color
    }
  }
})
export function useThemeStore() {
  return themeStore(store)
}
