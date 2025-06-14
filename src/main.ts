import ElementPlus, { ElDrawer, ElDialog, ElPopover, ElTooltip } from 'element-plus'
import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 在生产环境下，图标库会从CDN加载，不需要导入
// 创建一个类型声明，以便TypeScript可以识别通过CDN注入的全局变量
declare global {
  interface Window {
    ElementPlusIconsVue?: Record<string, any>
    __POWERED_BY_QIANKUN__?: boolean
  }
}

import directives from '@/directives'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import {
  init,
  vueIntegration,
  browserTracingIntegration,
  createSentryPiniaPlugin,
} from '@sentry/vue'

import { modifyComponents } from '@/utils/modifyComponent.tsx'

moment.locale('zh-cn') //中文化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import type { QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import App from './App.vue'

import getRouter from './router'

import { useSystemStore } from './stores/modules/system.ts'

let app: any
/**
 * @param container 主应用下发的props中的container,也就是子应用的根节点
 * 将子应用appendBody的元素,挂载到子应用根元素身上

 */
const proxy = (container: HTMLElement) => {
  if (document.body.appendChild.__isProxy__) return
  const revocable = Proxy.revocable(document.body.appendChild, {
    apply(target, thisArg, [node]) {
      if (container) {
        container.appendChild(node)
      } else {
        target.call(thisArg, node)
      }
    },
  })
  if (revocable.proxy) {
    document.body.appendChild = revocable.proxy
  }
  document.body.appendChild.__isProxy__ = true
}

function themeManager(props: QiankunProps) {
  const systemStore = useSystemStore()
  try {
    if (props.fn.getTheme) {
      const themeColor = props.fn.getTheme()
      if (themeColor) {
        systemStore.setTheme(themeColor)
      }
    }
    props.onGlobalStateChange((state: any) => {
      //更换主题
      if (state.action == 'changeTheme') {
        systemStore.setTheme(state.color)
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function render(props: QiankunProps) {
  const { container, data } = props
  proxy(container as HTMLElement)
  app = createApp(App)
  // 注册指令
  directives(app)

  app.use(ElementPlus)
  // 修改Element的appendToBody默认行为
  modifyComponents(app, [ElDrawer, ElTooltip], 'appendTo', () => container || '#app')

  // 注册图标组件 - 兼容开发环境和生产环境（CDN）
  if (import.meta.env.DEV) {
    // 开发环境: 动态导入图标
    const ElementPlusIconsVue = await import('@element-plus/icons-vue')
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  } else if (window.ElementPlusIconsVue) {
    // 生产环境: 使用CDN加载的全局变量
    for (const [key, component] of Object.entries(window.ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }

  const pinia = createPinia()
  const router = getRouter(props)

  //#region 初始化sentry
  init({
    app,
    dsn: 'https://e9b3c65caeec301093d764fdf7bff8e5@o4509455371337728.ingest.us.sentry.io/4509455378022400',
    normalizeDepth: 10,
    sendDefaultPii: true,
    integrations: [
      // 跟踪vue
      vueIntegration({
        tracingOptions: {
          // 跟踪vue组件
          trackComponents: true,
          // 需要跟踪的hooks,destroy用于vue2
          hooks: ['activate', 'create', 'unmount', 'destroy', 'mount', 'update'],
        },
      }),
      // 跟踪路由
      browserTracingIntegration({ router }),
    ],
  })
  // 跟踪pinia
  pinia.use(createSentryPiniaPlugin())
  //#endregion

  pinia.use(piniaPluginPersistedstate)

  // 测试主题变更
  // const systemStore = useSystemStore()
  // systemStore.setTheme('red');
  app.use(pinia)
  app.use(router)
  app.config.warnHandler = () => null

  if (container) {
    const root = container.querySelector('#app')
    app.mount(root)
  } else {
    app.mount('#app')
  }
}

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
} else {
  renderWithQiankun({
    mount(props: QiankunProps) {
      render(props)
      themeManager(props)
    },
    bootstrap() {
      console.log('%c ', 'color: green;', 'app bootstraped')
    },
    unmount(props: QiankunProps) {
      app?.unmount()
      app = null
    },
    update(props: QiankunProps) {},
  })
}
