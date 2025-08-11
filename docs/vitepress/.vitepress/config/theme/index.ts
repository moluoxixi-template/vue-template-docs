import type { DefaultTheme } from 'vitepress'
import { sidebar } from './sidebar'
import { nav } from './nav'
import { socialLinks } from './socialLinks'

/**
 * 主题配置
 */
const themeConfig: DefaultTheme.Config = {
  logo: '/vueComponents/avator.png',
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
