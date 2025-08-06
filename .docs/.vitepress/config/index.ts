import { defineConfig } from 'vitepress'
import { updateComponentDocs, updateGuidePages, updateIndexPage } from '../scripts/updateIndexPage'
import head from './head'
import themeConfig from './theme'
import markdown from './markdown'
import vite from './vite'

// 启动时更新页面内容
try {
  updateIndexPage()
  updateGuidePages()
  updateComponentDocs()
}
catch (error) {
  console.warn('⚠️ 更新页面内容失败:', error)
}

/**
 * VitePress 主配置
 */
export default defineConfig({
  title: 'Moluoxixi Vue组件库',
  outDir: '../docs/vitepress',
  description: '基于Vue3 + TypeScript + Element Plus的现代化组件库',
  lang: 'zh-CN',
  base: '/vue-component/',
  head,
  lastUpdated: true,
  themeConfig,
  markdown,
  vite,
})
