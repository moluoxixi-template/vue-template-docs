import type { Plugin, Component } from 'vue'

const pageFiles = import.meta.glob('./*/index.vue', { eager: true, import: 'default' })
const index: Plugin = Object.keys(pageFiles).reduce((modules = {}, modulePath) => {
  const name: string | undefined = modulePath.split('/').at(-2)
  const component: Component = pageFiles[modulePath] as Component
  if (!component) return modules
  if (name) {
    modules[name] = component
  }
  return modules
}, {}) as Plugin
export default index
