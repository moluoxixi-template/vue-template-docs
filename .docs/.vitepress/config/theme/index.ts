import type { DefaultTheme } from 'vitepress'
import { generateComponentNav, generateSidebar } from './utils/generateSidebar'
import { getRepoInfoWithFallback } from './utils/getRepoInfo'
import { docsPath } from '../../../contants'
import path from 'node:path'
import fs from 'node:fs'

const pkgPath = path.resolve(docsPath, './package.json')
const pkgContent = fs.readFileSync(pkgPath, 'utf-8')
const pkg = JSON.parse(pkgContent)
// 获取仓库信息
const repoInfo = getRepoInfoWithFallback()

/**
 * 侧边栏配置
 */
const sidebar = {
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
}
/**
 * 导航栏配置
 */
const nav = [
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
]

/**
 * 社交链接配置
 */
const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: repoInfo.url },
]

/**
 * 主题配置
 */
const themeConfig: DefaultTheme.Config = {
  logo: '/favicon.ico',
  siteTitle: 'Moluoxixi Vue组件库',
  outline: 3,
  search: {
    provider: 'local' as const,
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
  socialLinks,
  nav,
  sidebar,
}
export default themeConfig
