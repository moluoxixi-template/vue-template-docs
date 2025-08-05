import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins/mdPlugin'
import { generateComponentNav, generateSidebar } from './utils/generateSidebar'
import { getRepoInfoWithFallback } from './utils/getRepoInfo'
import { updateComponentDocs, updateGuidePages, updateIndexPage } from './scripts/updateIndexPage'

import pkg from '../../package.json'
import path from 'node:path'
// tailwind
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss'
import type { Plugin } from 'postcss'

// 获取仓库信息
const repoInfo = getRepoInfoWithFallback()

// 启动时更新页面内容
try {
  updateIndexPage()
  updateGuidePages()
  updateComponentDocs()
}
catch (error) {
  console.warn('⚠️ 更新页面内容失败:', error)
}

// SEO关键词
const content = [
  'vue3组件库',
  'moluoxixi组件库',
  'vue3',
  'element-plus',
  'typescript',
  'vite',
  'component library',
  'ui framework',
  'ui组件',
  '基础组件',
  '业务组件',
  '前端组件库',
  'vue组件',
].toString()
export default defineConfig({
  title: 'Moluoxixi Vue组件库',
  description: '基于Vue3 + TypeScript + Element Plus的现代化组件库',
  lang: 'zh-CN',
  base: '/vue-component/',
  head: [
    ['meta', { name: 'author', content: 'moluoxixi' }],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    [
      'meta',
      {
        name: 'description',
        content: '基于Vue3 + TypeScript + Element Plus的现代化组件库，提供丰富的业务组件和工具函数',
      },
    ],
    ['meta', { name: 'keywords', content }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'Moluoxixi Vue组件库',
    outline: 3,
    search: {
      provider: 'local',
    },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    outlineTitle: '本页导航',
    lastUpdatedText: '上次更新时间',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    socialLinks: [{ icon: 'github', link: repoInfo.url }],
    nav: [
      {
        text: '指南',
        link: '/guide/',
      },
      generateComponentNav(),
      {
        text: '更新日志',
        link: '/guide/changelog',
      },
      {
        text: 'GitHub',
        link: repoInfo.url,
      },
      {
        text: `v${pkg.version}`,
        link: repoInfo.releasesUrl,
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            {
              text: '简介',
              link: '/guide/',
            },
            {
              text: '安装',
              link: '/guide/installation',
            },
            {
              text: '快速开始',
              link: '/guide/quickstart',
            },
            {
              text: '按需引入',
              link: '/guide/resolver',
            },
            {
              text: '更新日志',
              link: '/guide/changelog',
            },
          ],
        },
      ],
      '/components/': generateSidebar(),
    },
  },
  markdown: {
    lineNumbers: true,
    config: (md: any) => mdPlugin(md),
  },
  vite: {
    resolve: {
      alias: {
        '@moluoxixi/components': path.resolve(__dirname, '../../packages/components'),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss() as Plugin, autoprefixer() as Plugin],
      },
    },
  },
})
