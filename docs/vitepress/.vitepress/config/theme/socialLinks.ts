import type { DefaultTheme } from 'vitepress'
import { getRepoInfoWithFallback } from './utils/getRepoInfo'

// 获取仓库信息
const repoInfo = getRepoInfoWithFallback()

/**
 * 社交链接配置
 */
export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: repoInfo.url },
]
