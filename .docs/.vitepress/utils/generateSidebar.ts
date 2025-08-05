import fs from 'node:fs'
import path from 'node:path'
import { rootPath } from '../../contants'

interface ComponentInfo {
  name: string
  path: string
  category: string
}
/**
 * 扫描packages/components目录，自动生成组件列表
 */
export function scanComponents(): ComponentInfo[] {
  const componentsDir = path.resolve(rootPath, './packages/components')

  if (!componentsDir) {
    console.warn('❌ packages/components 目录不存在，尝试的路径:', componentsDir)
    return []
  }

  const components: ComponentInfo[] = []

  try {
    const items = fs.readdirSync(componentsDir, { withFileTypes: true })
    console.log(`📁 扫描到 ${items.length} 个项目:`, items.map(item => `${item.name}(${item.isDirectory() ? 'dir' : 'file'})`))

    for (const item of items) {
      // 跳过非目录项和以下划线开头的目录（工具目录）
      if (!item.isDirectory() || item.name.startsWith('_') || item.name === 'node_modules') {
        console.log(`⏩ 跳过: ${item.name}`)
        continue
      }

      const componentPath = path.join(componentsDir, item.name)
      const indexTs = path.join(componentPath, 'index.ts')
      const indexVue = path.join(componentPath, 'index.vue')

      // 检查是否有入口文件
      if (fs.existsSync(indexTs) || fs.existsSync(indexVue)) {
        const component = {
          name: item.name,
          path: `/components/${item.name}`,
          category: categorizeComponent(item.name),
        }
        components.push(component)
        console.log(`✅ 添加组件: ${item.name} -> ${component.category}`)
      }
      else {
        console.log(`❌ 无入口文件: ${item.name}`)
      }
    }

    console.log(`🎯 最终扫描到 ${components.length} 个有效组件`)
    return components.sort((a, b) => a.name.localeCompare(b.name))
  }
  catch (error) {
    console.error('❌ 扫描组件目录失败:', error)
    console.log('🔄 使用静态备用组件列表')
    return getStaticComponentList()
  }
}

/**
 * 静态备用组件列表（当动态扫描失败时使用）
 */
function getStaticComponentList(): ComponentInfo[] {
  const staticComponents = [
    'ApiDialog',
    'Calendar',
    'ConfigForm',
    'ConfigProvider',
    'ConfigTable',
    'DateRangePicker',
    'DraggableTable',
    'EnterNextContainer',
    'EnterNextDragTable',
    'EnterNextTable',
    'EslintConfig',
    'ExportExcel',
    'Icon',
    'KeepAllAlive',
    'MarkdownEditor',
    'PopoverTableSelect',
    'Select',
    'Splitter',
    'Tabs',
    'ViteConfig',
    'Watermark',
  ]

  return staticComponents.map(name => ({
    name,
    path: `/components/${name}`,
    category: categorizeComponent(name),
  })).sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * 根据组件名称分类
 */
function categorizeComponent(name: string): string {
  const basicComponents = ['Icon', 'Watermark', 'Splitter']
  const formComponents = ['Select', 'DateRangePicker', 'ConfigForm']
  const tableComponents = ['ConfigTable', 'DraggableTable', 'EnterNextTable', 'EnterNextDragTable', 'PopoverTableSelect']
  const layoutComponents = ['Tabs', 'EnterNextContainer', 'KeepAllAlive']
  const utilComponents = ['Calendar', 'MarkdownEditor', 'ExportExcel', 'ApiDialog']
  const configComponents = ['ConfigProvider', 'ViteConfig', 'EslintConfig']

  if (basicComponents.includes(name))
    return '基础组件'
  if (formComponents.includes(name))
    return '表单组件'
  if (tableComponents.includes(name))
    return '表格组件'
  if (layoutComponents.includes(name))
    return '布局组件'
  if (utilComponents.includes(name))
    return '工具组件'
  if (configComponents.includes(name))
    return '配置组件'

  return '其他组件'
}

/**
 * 生成VitePress侧边栏配置
 */
export function generateSidebar() {
  console.log('🚀 开始生成侧边栏配置...')
  const components = scanComponents()

  console.log(`📊 扫描结果: ${components.length} 个组件`)

  if (components.length === 0) {
    console.warn('⚠️ 没有扫描到组件，返回空侧边栏')
    return []
  }

  // 按分类分组
  const categories = new Map<string, ComponentInfo[]>()

  for (const component of components) {
    if (!categories.has(component.category)) {
      categories.set(component.category, [])
    }
    categories.get(component.category)!.push(component)
  }

  // 转换为VitePress侧边栏格式
  const sidebar = Array.from(categories.entries()).map(([category, items]) => ({
    text: category,
    items: items.map(item => ({
      text: item.name,
      link: item.path,
    })),
  }))

  console.log('✅ 侧边栏生成完成，分类数:', sidebar.length)
  sidebar.forEach((group) => {
    console.log(`  📂 ${group.text}: ${group.items.length} 个组件`)
  })

  return sidebar
}

/**
 * 生成组件导航配置
 */
export function generateComponentNav() {
  console.log('🧭 生成组件导航...')
  const components = scanComponents()

  const nav = {
    text: `组件 (${components.length})`,
    link: '/components/',
  }

  console.log('✅ 组件导航生成完成:', nav.text)
  return nav
}
