import Vue from 'vue'

// Vue 2不支持import.meta.glob的eager和import选项，需要手动导入
import element from './element.vue'

const layouts: any = {
  element
}

layouts.install = function (Vue: any) {
  const layoutNames = Object.keys(layouts)
  layoutNames.forEach((name) => {
    if (name !== 'install')
      Vue.component(name, layouts[name])
  })
}

export default layouts
