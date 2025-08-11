import type { QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import {
  browserTracingIntegration,
  init,
  replayCanvasIntegration,
  replayIntegration,
  vueIntegration,
} from '@sentry/vue'

import moment from 'moment'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import directives from '@/directives'
import i18n from '@/locales'
import store from '@/stores'
import App from './App.vue'
import getRouter from './router'

import '@/assets/styles/main.css'

import '@/assets/styles/element/index.scss'

import '@/assets/fonts/index.css'

import 'moment/dist/locale/zh-cn' // 中文化

moment.locale('zh-cn')

Vue.use(VueCompositionAPI)
Vue.use(ElementUI)

Vue.config.productionTip = false

let app: any

/**
 * @param container 主应用下发的props中的container,也就是子应用的根节点
 * 将子应用appendBody的元素,挂载到子应用根元素身上
 */
function proxy(container: HTMLElement) {
  if ((document.body.appendChild as any).__isProxy__)
    return
  const revocable = Proxy.revocable(document.body.appendChild, {
    apply(target, thisArg, [node]) {
      if (container) {
        container.appendChild(node)
      }
      else {
        target.call(thisArg, node)
      }
    },
  })
  if (revocable.proxy) {
    document.body.appendChild = revocable.proxy
  }
  ;(document.body.appendChild as any).__isProxy__ = true

  const removecable = Proxy.revocable(document.body.removeChild, {
    apply(target, thisArg, [node]) {
      if (container) {
        container.removeChild(node)
      }
      else {
        target.call(thisArg, node)
      }
    },
  })
  if (removecable.proxy) {
    document.body.removeChild = removecable.proxy
  }
  ;(document.body.removeChild as any).__isProxy__ = true
}

function themeManager(props: QiankunProps) {
  // 在Vue 2中，我们需要从store中获取system store
  try {
    if (props.fn.getTheme) {
      const themeColor = props.fn.getTheme()
      if (themeColor) {
        store.dispatch('system/setTheme', themeColor)
      }
    }
    props.onGlobalStateChange((state: any) => {
      // 更换主题
      if (state.action === 'changeTheme') {
        store.dispatch('system/setTheme', state.color)
      }
    })
  }
  catch {
  }
}

async function render(props: QiankunProps) {
  const { container } = props
  proxy(container as HTMLElement)

  // 注册指令
  directives(Vue)

  const router = getRouter(props)

  //#region 初始化sentry
  import.meta.env.VITE_SENTRY
    && init({
      Vue,
      dsn: 'https://e9b3c65caeec301093d764fdf7bff8e5@o4509455371337728.ingest.us.sentry.io/4509455378022400',
      normalizeDepth: 10,
      sendDefaultPii: true,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
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
        // 录制页面中的错误
        replayIntegration(),
        // 录制canvas中的错误
        replayCanvasIntegration(),
      ],
    })
  //#endregion

  app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  })

  // 在Vue 2中挂载应用到容器
  let mountTarget = '#app'

  if (container) {
    // 对于微前端场景，我们需要一个特殊处理
    // 创建一个div元素作为挂载点
    const appElement = document.createElement('div')
    appElement.id = 'sub-app-element'
    container.appendChild(appElement)
    mountTarget = '#sub-app-element'
  }

  app.$mount(mountTarget)
}

// 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({}).then()
}
else {
  renderWithQiankun({
    async mount(props: QiankunProps) {
      await render(props)
      themeManager(props)
    },
    bootstrap() {
    },
    unmount() {
      app?.$destroy()
      app = null
    },
    update() {
    },
  })
}
