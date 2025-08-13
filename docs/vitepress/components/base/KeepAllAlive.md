# KeepAllAlive

## 组件示例

基于 `keep-alive` 实现的全局路由缓存容器。默认根据 `route.query.keepAlive` 或 `route.meta.keepAlive` 判定是否缓存；也可通过 `defaultKeepAlive` 函数统一控制。不同 `fullPath`（包含参数与查询）的路由将作为不同缓存实例保存。

### 基础（使用 query.keepAlive）

当地址栏带有 `?keepAlive=true` 时缓存页面，否则不缓存。

:::demo
KeepAllAlive/base/query
:::

### 使用 meta.keepAlive

路由元信息 `meta.keepAlive=true` 时始终缓存该路由。

:::demo
KeepAllAlive/base/meta
:::

### 统一默认策略：props.defaultKeepAlive

通过 `defaultKeepAlive(route)` 返回布尔值，统一控制是否缓存。

:::demo
KeepAllAlive/props/default-keep-true
:::

返回逻辑也可以基于 `route.meta` 或路径匹配。

:::demo
KeepAllAlive/props/default-keep-by-path
:::

### 按参数区分缓存（fullPath 唯一）

不同参数或查询的同一路由会被视作不同实例分别缓存。

:::demo
KeepAllAlive/params/different
:::

### 暴露方法：清除单个或全部缓存

通过组件实例方法清除指定路由或全部缓存。

:::demo
KeepAllAlive/expose/clearCache
:::

:::demo
KeepAllAlive/expose/clearAllCache
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `defaultKeepAlive` | 统一的缓存判定函数，返回 `true/false` | ^[Function]`(route: any) => boolean` | `null` |

判定优先级：`defaultKeepAlive` > `route.query.keepAlive==='true'` \|\| `route.meta.keepAlive`。

### Slots

该组件不提供插槽。

### Emits

该组件不触发自定义事件。

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `clearCache` | 清除指定 `fullPath` 的缓存 | ^[Function]`(fullPath: string) => void` |
| `clearAllCache` | 清除所有缓存 | ^[Function]`() => void` |


