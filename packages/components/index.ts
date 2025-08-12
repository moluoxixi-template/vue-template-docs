import type { App } from 'vue'

import ConfigForm from '@moluoxixi/components/ConfigForm'
import DateRangePicker from '@moluoxixi/components/DateRangePicker'
import DraggableTable from '@moluoxixi/components/DraggableTable'
import EnterNextContainer from '@moluoxixi/components/EnterNextContainer'
import EnterNextDragTable from '@moluoxixi/components/EnterNextDragTable'
import EnterNextTable from '@moluoxixi/components/EnterNextTable'
import ExportExcel from '@moluoxixi/components/ExportExcel'
import PopoverTableSelect from '@moluoxixi/components/PopoverTableSelect'
import Select from '@moluoxixi/components/Select'
import Tabs from '@moluoxixi/components/Tabs'
import KeepAllAlive from '@moluoxixi/components/KeepAllAlive'
import ApiDialog from '@moluoxixi/components/ApiDialog'
import EslintConfig from '@moluoxixi/components/EslintConfig'
import ViteConfig from '@moluoxixi/components/ViteConfig'

export {
  ApiDialog,
  ConfigForm,
  DateRangePicker,
  DraggableTable,
  EnterNextContainer,
  EnterNextDragTable,
  EnterNextTable,
  EslintConfig,
  ExportExcel,
  KeepAllAlive,
  PopoverTableSelect,
  Select,
  Tabs,
  ViteConfig,
}

const components = [ConfigForm, DateRangePicker, DraggableTable, EnterNextContainer, EnterNextDragTable, EnterNextTable, ExportExcel, KeepAllAlive, PopoverTableSelect, Select, Tabs]

export default {
  install(app: App) {
    components.forEach((component) => {
      console.log('🚀 注册组件:', component.name)
      if (component.name) {
        app.component(component.name, component)
      }
    })
  },
}
