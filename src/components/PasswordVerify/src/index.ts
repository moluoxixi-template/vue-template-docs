import type { AppContext, Component, VNode } from 'vue'
import { createVNode, render } from 'vue'
import Dialog from './index.vue'

// 插槽类型定义
export type SlotType = VNode[] | VNode | Component | string | (() => VNode[])

// 接口定义
export interface DialogOptions {
  title?: string
  isEdit?: boolean
  rules?: Record<string, any[]>
  form?: Record<string, any>
  showName?: boolean
  needTime?: boolean
  successMessage?: string
  timeOptions?: {
    label?: string
    [key: string]: any
  }
  appContext?: AppContext | null
  // 插槽配置
  slots?: {
    default?: SlotType // 默认插槽（中间插槽）
    before?: SlotType // 前置插槽
    after?: SlotType // 后置插槽
  }
}

// 创建容器
function createContainer() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

/**
 * API方式调用的密码验证框
 * @param options 配置选项
 * @returns Promise 验证通过后返回用户信息和时间
 */
function Index(options: DialogOptions = {}): Promise<any> {
  const container = createContainer()
  const { slots, ...props } = options

  return new Promise((resolve, reject) => {
    // 创建VNode
    const vnode = createVNode(
      Dialog,
      {
        ...props,
        modelValue: true, // 默认显示
        onVerified: (data: any) => {
          // 验证通过
          resolve(data)
          // 清理DOM
          render(null, container)
          container.remove()
        },
        onClose: () => {
          // 对话框关闭但未验证通过
          reject(new Error('密码验证已取消'))
          // 清理DOM
          render(null, container)
          container.remove()
        },
      },
      slots || {},
    ) // 传递插槽内容

    // 应用上下文
    if (options.appContext) {
      vnode.appContext = options.appContext
    }

    // 渲染组件
    render(vnode, container)
  })
}

// 导出默认函数
export default Index
