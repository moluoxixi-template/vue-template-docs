import type { App as VueApp } from 'vue'
import ElementPlus from 'element-plus'
import './styles/element/index.scss'
import 'vxe-table/lib/style.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
// 图标并进行全局注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Layout from './components/layout.vue'

// 引入vue-component组件库
import VueComponent from '@moluoxixi/components'

import * as echarts from 'echarts'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js' // 引入echarts

import DocsCodeDemo from './components/docs-code-demo.vue'

import directive from './directives'
import type { Theme } from 'vitepress'

const define = <T>(value: T): T => value

export default define<Theme>({
  Layout,
  enhanceApp({ app }: { app: VueApp }) {
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale, // 语言设置
    })
    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    // 注册vue-component组件库
    app.use(VueComponent)
    app.config.globalProperties.$echarts = echarts // 全局使用
    app.component('highlightjs', hljsVuePlugin.component) // 注册代码高亮组件
    app.component('DocsCodeDemo', DocsCodeDemo)
    directive(app)
  },
})
