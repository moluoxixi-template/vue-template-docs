import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { getRepoInfoWithFallback } from '../utils/getRepoInfo'
import { docsPath } from '../../contants'

/**
 * 动态更新首页内容，替换GitHub链接
 */
export function updateIndexPage() {
  console.log('🔄 开始更新首页内容...')

  const repoInfo = getRepoInfoWithFallback()
  const indexPath = path.resolve(docsPath, './index.md')

  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.md 文件不存在')
    return
  }

  try {
    let content = fs.readFileSync(indexPath, 'utf-8')

    // 替换 GitHub 按钮链接
    content = content.replace(
      /link: https:\/\/github\.com\/[^/]+\/[^/\s]+/g,
      `link: ${repoInfo.url}`,
    )

    // 替换 GitHub Stars 徽章
    content = content.replace(
      /https:\/\/img\.shields\.io\/github\/stars\/[^/]+\/[^/\s]+\.svg/g,
      repoInfo.starsBadgeUrl,
    )

    // 替换 GitHub Stars 链接
    content = content.replace(
      /https:\/\/github\.com\/[^/]+\/[^/\s]+(?=")/g,
      repoInfo.url,
    )

    // 替换 License 徽章
    content = content.replace(
      /https:\/\/img\.shields\.io\/github\/license\/[^/]+\/[^/\s]+\.svg/g,
      repoInfo.licenseBadgeUrl,
    )

    // 替换 License 链接
    content = content.replace(
      /https:\/\/github\.com\/[^/]+\/[^/]+\/blob\/main\/LICENSE/g,
      repoInfo.licenseUrl,
    )

    // 替换贡献者链接
    content = content.replace(
      /https:\/\/github\.com\/[^/]+\/[^/]+\/graphs\/contributors/g,
      repoInfo.contributorsUrl,
    )

    // 替换贡献者图片
    content = content.replace(
      /https:\/\/contrib\.rocks\/image\?repo=[^/]+\/[^/\s&"]+/g,
      `https://contrib.rocks/image?repo=${repoInfo.owner}/${repoInfo.repo}`,
    )

    fs.writeFileSync(indexPath, content, 'utf-8')
    console.log('✅ 首页内容更新完成')
  }
  catch (error) {
    console.error('❌ 更新首页内容失败:', error)
  }
}

/**
 * 动态更新指南页面内容
 */
export function updateGuidePages() {
  console.log('🔄 开始更新指南页面内容...')

  const repoInfo = getRepoInfoWithFallback()
  const guideDir = path.resolve(__dirname, '../../guide')

  if (!fs.existsSync(guideDir)) {
    console.error('❌ guide 目录不存在')
    return
  }

  try {
    const files = fs.readdirSync(guideDir).filter(file => file.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(guideDir, file)
      let content = fs.readFileSync(filePath, 'utf-8')

      // 替换GitHub仓库链接（但不包括其他GitHub项目的链接）
      content = content.replace(
        /https:\/\/github\.com\/[^/]+\/[^/\s)]+(?=[\s)]|$)/g,
        (match) => {
          // 保持antfu等其他项目的链接不变
          if (match.includes('/antfu/') || match.includes('/unplugin/')) {
            return match
          }
          return repoInfo.url
        },
      )

      // 替换Issues和Discussions链接
      content = content.replace(
        /https:\/\/github\.com\/[^/]+\/[^/]+\/issues/g,
        repoInfo.issuesUrl,
      )

      content = content.replace(
        /https:\/\/github\.com\/[^/]+\/[^/]+\/discussions/g,
        repoInfo.discussionsUrl,
      )

      fs.writeFileSync(filePath, content, 'utf-8')
      console.log(`✅ 更新 ${file} 完成`)
    }
  }
  catch (error) {
    console.error('❌ 更新指南页面失败:', error)
  }
}

/**
 * 动态更新组件文档页面
 */
export function updateComponentDocs() {
  console.log('🔄 开始更新组件文档页面...')

  const repoInfo = getRepoInfoWithFallback()
  const componentsDir = path.resolve(__dirname, '../../components')

  if (!fs.existsSync(componentsDir)) {
    console.error('❌ components 目录不存在')
    return
  }

  try {
    const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(componentsDir, file)
      let content = fs.readFileSync(filePath, 'utf-8')

      // 替换源码链接
      content = content.replace(
        /https:\/\/github\.com\/[^/]+\/[^/]+\/tree\/main\/packages\/components\/([^)]+)/g,
        `${repoInfo.url}/tree/main/packages/components/$1`,
      )

      fs.writeFileSync(filePath, content, 'utf-8')
      console.log(`✅ 更新组件文档 ${file} 完成`)
    }
  }
  catch (error) {
    console.error('❌ 更新组件文档失败:', error)
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  updateIndexPage()
  updateGuidePages()
  updateComponentDocs()
}
