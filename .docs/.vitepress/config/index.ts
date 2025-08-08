import { defineConfig } from 'vitepress'
import head from './head'
import themeConfig from './theme'
import markdown from './markdown'
import vite from './vite'

/**
 * VitePress 主配置
 */
export default defineConfig({
  title: 'Moluoxixi Vue组件库',
  outDir: '../docs/vitepress',
  description: '基于Vue3 + TypeScript + Element Plus的现代化组件库',
  lang: 'zh-CN',
  base: '/vueComponent/',
  head,
  lastUpdated: true,
  themeConfig,
  markdown,
  vite,
})
