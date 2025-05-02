import { debounce } from 'radash'

export default function (app) {
  app.directive('debounce', {
    mounted(el, binding) {
      const arg = binding?.arg || 'click'
      const { delay = 1000, args = null, handler = () => {} } = binding.value
      // // 使用radash的debounce方法创建防抖函数
      const debouncedFn = debounce({ delay: delay }, () => {
        handler(args)
      })
      // // 将防抖函数赋值给元素的事件处理函数
      el.addEventListener(arg, debouncedFn)
    },
    updated(el, binding) {
      const arg = binding?.arg || 'click'
      const { delay = 1000, args = null, handler = () => {} } = binding.value
      // // 使用radash的debounce方法创建防抖函数
      const debouncedFn = debounce({ delay: delay }, () => {
        handler(args)
      })
      // // 将防抖函数赋值给元素的事件处理函数
      el.addEventListener(arg, debouncedFn)
    },
    // 当指令所在的组件被销毁时执行
    unmounted(el, binding) {
      // 移除元素上的事件监听器
      const arg = binding?.arg || 'click'
      el.removeEventListener(arg, el._v_debounce)
    }
  })
}
