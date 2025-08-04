import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js' // 引入echarts

// 引入vue-component组件库
import VueComponent from '@moluoxixi/components'

import TVHtml from '../components/TVHtml.vue'
import TIcon from '../components/TIcon.vue'
import TTip from '../components/TTip.vue'
import DocsCodeDemo from './components/docs-code-demo.vue'
import MyLayout from './components/layout.vue'

import directive from './directives'
import './styles/index.scss'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }: { app: App }) {
    app.config.globalProperties.$echarts = echarts // 全局使用
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册vue-component组件库
    app.use(VueComponent)
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    app.component('highlightjs', hljsVuePlugin.component) // 注册代码高亮组件
    app.component('DocsCodeDemo', DocsCodeDemo)
    app.component('TVHtml', TVHtml)
    app.component('TIcon', TIcon)
    app.component('TTip', TTip)
    directive(app)
  },
}
