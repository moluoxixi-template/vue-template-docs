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

const componentFiles = import.meta.glob([
  './**/index.vue',
  '!./**/components/**',
  '!./**/base/**',
  '!./**/_*/**',
], {
  eager: true,
  import: 'default',
})

const components = Object.keys(componentFiles).reduce((modules = {}, modulePath) => {
  const nameArr: string[] = modulePath.split('/')
  const name: string | undefined = nameArr.at(1)
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
      console.log('🚀 注册组件:', name)
      app.component(name, components[name])
    })
  },
}
