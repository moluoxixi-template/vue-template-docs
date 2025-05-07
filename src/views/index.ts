import type { Plugin, Component } from 'vue'

const pageFiles = import.meta.glob('./**/index.vue', { eager: true, import: 'default' })
const pages: Plugin = Object.keys(pageFiles).reduce((modules = {}, modulePath) => {
  const name: string | undefined = modulePath.split('/').at(-2)
  const component: Component = pageFiles[modulePath] as Component
  if (!component) return modules
  if (name) {
    modules[name as string] = component
  }
  return modules
}, {} as any) as Plugin
export default pages
