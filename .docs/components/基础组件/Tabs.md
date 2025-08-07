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
| v-model | 绑定值，选中选项卡的name | String | '1' |
| tabList | 标签页列表配置 | Array\<TabItem\> | [] |

#### TabItem 接口

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 标签页唯一标识符 | String | - |
| label | 标签页标题 | String | - |
| slot | 自定义插槽名称，不传则使用label | String | - |
| lazy | 是否延迟渲染 | Boolean | false |
| show | 控制标签页是否显示的函数 | (item: any) => boolean | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| tabChange | tab被选中时触发 | (name: string) |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| [slot\|label] | 标签页内容，插槽名称为tabList中item的slot属性或label属性 |

### Expose

该组件没有暴露任何方法或属性。

## 源码

查看组件源码：[Tabs](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/Tabs)