# Tabs

增强的标签页组件，基于Element Plus Tabs封装，支持更多功能特性。

## 基础用法

:::demo
Tabs/base
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值，选中选项卡的name | String | - |
| type | 风格类型 | String | '' |
| closable | 标签是否可关闭 | Boolean | false |
| addable | 标签是否可增加 | Boolean | false |
| editable | 标签是否同时可增加和关闭 | Boolean | false |
| tabPosition | 选项卡所在位置 | String | 'top' |
| stretch | 标签的宽度是否自撑开 | Boolean | false |
| beforeLeave | 切换标签之前的钩子函数 | Function | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| tab-click | tab被选中时触发 | (pane, ev) |
| tab-change | activeName改变时触发 | (name) |
| tab-remove | 点击tab移除按钮时触发 | (name) |
| tab-add | 点击tabs的新增按钮时触发 | - |
| edit | 点击tabs的新增按钮或tab的关闭按钮时触发 | (targetName, action) |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签页内容 |
| tab-{name} | 自定义标签页标题 |

### TabPane Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项卡标题 | String | - |
| name | 与选项卡绑定值value对应的标识符 | String | - |
| disabled | 是否禁用 | Boolean | false |
| closable | 标签是否可关闭 | Boolean | false |
| lazy | 标签是否延迟渲染 | Boolean | false |

## 源码

查看组件源码：[Tabs](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/Tabs)