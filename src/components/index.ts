import type { App, Component } from 'vue'

import DraggableTable from '@/components/DraggableTable'

export { DraggableTable }

const componentFiles = import.meta.glob(['./**/index.vue', '!./**/components/*'], {
  eager: true,
  import: 'default',
})

const components = Object.keys(componentFiles).reduce((modules = {}, modulePath) => {
  const nameArr: string[] = modulePath.split('/')
  const name: string | undefined
    = nameArr.at(-1) === 'index.vue' ? nameArr.at(-2) : nameArr.at(-1)?.slice(0, -4)
  const component: Component = componentFiles[modulePath] as Component
  if (!component)
    return modules
  if (name) {
    modules[name as string] = component
  }
  return modules
}, {} as any)

export default {
  install(app: App) {
    const componentNames = Object.keys(components)
    componentNames.forEach((name) => {
      app.component(name, components[name])
    })
  },
}
