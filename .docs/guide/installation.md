# 安装

## 环境要求

在开始之前，请确保你的开发环境满足以下版本要求：

- **Node.js**: >= 18.0.0
- **Vue**: >= 3.3.0
- **TypeScript**: >= 4.7.0 (可选，但推荐)

## 使用包管理器 <el-tag effect="dark">推荐</el-tag>

**建议您使用包管理器 ([pnpm](https://pnpm.io/) <el-tag effect="dark">推荐</el-tag> ， [yarn](https://classic.yarnpkg.com/lang/en/)，[npm](https://www.npmjs.com/)) 安装 @moluoxixi/components**。

::: code-group

```sh [pnpm]
pnpm install @moluoxixi/components
```

```sh [yarn]
yarn add @moluoxixi/components
```

```sh [npm]
npm install @moluoxixi/components
```

:::

## 依赖说明

Moluoxixi Vue组件库基于以下依赖构建，这些依赖会自动安装：

```json
{
  "peerDependencies": {
    "vue": "^3.3.0",
    "element-plus": "^2.4.0"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^2.3.1"
  }
}
```

如果你的项目中还没有安装 Element Plus，需要手动安装：

::: code-group

```sh [pnpm]
pnpm install element-plus @element-plus/icons-vue
```

```sh [yarn]
yarn add element-plus @element-plus/icons-vue
```

```sh [npm]
npm install element-plus @element-plus/icons-vue
```

:::

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 @moluoxixi/components，然后就可以使用全局变量 `MoluoxixiComponents` 了。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 [unpkg](https://unpkg.com) 和 [jsDelivr](https://jsdelivr.com) 举例。

### unpkg

```html
<head>
  <!-- 导入 Vue3 -->
  <script src="//unpkg.com/vue@3"></script>
  
  <!-- 导入 Element Plus 样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- 导入 Element Plus -->
  <script src="//unpkg.com/element-plus"></script>

  <!-- 导入 Moluoxixi Components 样式 -->
  <link rel="stylesheet" href="//unpkg.com/@moluoxixi/components/dist/index.css" />
  <!-- 导入 Moluoxixi Components -->
  <script src="//unpkg.com/@moluoxixi/components"></script>
</head>
```

### jsDelivr

```html
<head>
  <!-- 导入 Vue3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  
  <!-- 导入 Element Plus 样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
  <!-- 导入 Element Plus -->
  <script src="//cdn.jsdelivr.net/npm/element-plus"></script>

  <!-- 导入 Moluoxixi Components 样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@moluoxixi/components/dist/index.css" />
  <!-- 导入 Moluoxixi Components -->
  <script src="//cdn.jsdelivr.net/npm/@moluoxixi/components"></script>
</head>
```

### Hello World 示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Moluoxixi Components Demo</title>
  <script src="//unpkg.com/vue@3"></script>
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <script src="//unpkg.com/element-plus"></script>
  <link rel="stylesheet" href="//unpkg.com/@moluoxixi/components/dist/index.css" />
  <script src="//unpkg.com/@moluoxixi/components"></script>
</head>
<body>
  <div id="app">
    <config-table :columns="columns" :data="tableData"></config-table>
  </div>

  <script>
    const { createApp } = Vue
    const { ElMessage } = ElementPlus
    
    createApp({
      data() {
        return {
          columns: [
            { prop: 'name', label: '姓名' },
            { prop: 'age', label: '年龄' }
          ],
          tableData: [
            { name: '张三', age: 25 },
            { name: '李四', age: 30 }
          ]
        }
      }
    })
    .use(ElementPlus)
    .use(MoluoxixiComponents)
    .mount('#app')
  </script>
</body>
</html>
```

::: warning 版本说明
建议在生产环境中锁定版本号，避免因版本更新导致的兼容性问题：

```html
<!-- 锁定到具体版本 -->
<script src="//unpkg.com/@moluoxixi/components@1.0.0"></script>
```
:::

## TypeScript 支持

如果你使用 TypeScript，组件库提供了完整的类型定义。安装后即可享受完整的类型提示和检查。

```ts
// 类型会自动推断
import { ConfigTable, ConfigForm } from '@moluoxixi/components'
import type { ConfigTableColumn, ConfigFormItem } from '@moluoxixi/components'
```

## 下一步

完成安装后，请查看 [快速开始](/guide/quickstart) 了解如何在项目中使用组件库。