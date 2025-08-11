import { mdPlugin } from './plugins/mdPlugin'

/**
 * Markdown 配置
 */
const markdownConfig = {
  lineNumbers: true,
  config: (md: any) => mdPlugin(md),
}
export default markdownConfig
