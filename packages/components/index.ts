import type { App, Component } from 'vue'

import ConfigForm from '@moluoxixi/components/ConfigForm'
import ConfigTable from '@moluoxixi/components/ConfigTable'
import DateRangePicker from '@moluoxixi/components/DateRangePicker'
import DraggableTable from '@moluoxixi/components/DraggableTable'
import EnterNextContainer from '@moluoxixi/components/EnterNextContainer'
import EnterNextDragTable from '@moluoxixi/components/EnterNextDragTable'
import EnterNextTable from '@moluoxixi/components/EnterNextTable'
import ExportExcel from '@moluoxixi/components/ExportExcel'
import KeepAllAlive from '@moluoxixi/components/KeepAllAlive'
import PopoverTableSelect from '@moluoxixi/components/PopoverTableSelect'
import Select from '@moluoxixi/components/Select'
import Tabs from '@moluoxixi/components/Tabs'
import { store } from '@moluoxixi/components/_stores'

export {
  ConfigForm,
  ConfigTable,
  DateRangePicker,
  DraggableTable,
  EnterNextContainer,
  EnterNextDragTable,
  EnterNextTable,
  ExportExcel,
  KeepAllAlive,
  PopoverTableSelect,
  Select,
  Tabs,
}

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
    app.use(store)
  },
}
