# Auto Routes Plugin

这是一个Vite插件，用于自动生成Vue路由配置。

## 功能特性

- 自动扫描指定目录下的Vue文件，生成路由配置
- 支持嵌套路由，根据目录结构自动生成层级关系
- 支持热更新，当文件变化时自动更新路由
- 使用虚拟模块，无需额外文件生成
- 完全基于JS，无TS类型声明，避免兼容性问题

## 使用方法

### 1. 在vite.config.ts中引入插件

```ts
import autoRoutes from './plugins/autoRoutes'

export default defineConfig({
  plugins: [
    // 其他插件...
    autoRoutes({
      views: 'src/views/**/index.vue',
      examples: 'src/examples/**/index.vue',
      // 可以添加更多的路由配置，key为路由前缀，value为glob匹配规则
    }),
  ],
  // 其他配置...
})
```

### 2. 在路由文件中使用虚拟模块

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import autoRoutes from 'virtual:auto-routes'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('./layout.vue'),
    children: autoRoutes,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
```

## 配置说明

插件接收一个配置对象，其中：

- 键(key)：作为路由的前缀
- 值(value)：作为glob匹配规则，必须基于根目录

## 注意事项

- glob匹配规则必须基于项目根目录
- 虚拟模块导出的是JS，不包含TS类型声明
- 路径处理逻辑：从src后面一位到倒数第二位作为路径
- 组件名称取自组件的name属性或路径的最后一部分
