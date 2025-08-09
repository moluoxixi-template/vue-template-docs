# EnterNextContainer

回车自动跳转容器组件，让用户可以通过按回车键在表单输入框之间快速跳转。

## 组件示例

### 基础用法

示例：容器内按 Enter 键顺序聚焦下一个输入/选择控件

:::demo
EnterNextContainer/base
:::

### Props

示例：通过 `virtualRef` 监听外部容器而非自身
:::demo
EnterNextContainer/virtualRef
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| virtualRef | 外部元素引用，当提供时，将监控该元素而不是容器内部 | ComponentPublicInstance \| ComponentInternalInstance \| HTMLElement \| null | null |
| allowSelectNextInEmpty | 是否允许在select没有选中值时跳转 | Boolean | false |
| focusNum | 默认聚焦第几个元素 | Number \| undefined | - |
| autoNext | 禁用是否下一个 | Boolean | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| noNextInput | 当用户在最后一个输入元素上按下Enter键，或者只有一个输入元素时触发 | (element: HTMLElement) |
| noSelectValue | 当select下拉框没有选中值时但按了回车触发 | (element: HTMLElement) |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，包含需要监听的表单元素 |

### Expose

该组件没有暴露任何方法或属性。

## 工作原理

1. 组件使用MutationObserver监听DOM变化，实时收集所有input和select元素
2. 对每个input和select元素添加keyup事件监听器
3. 当用户按下回车键时，自动跳转到下一个输入元素
4. 如果没有下一个元素，触发`noNextInput`事件

## 源码

查看组件源码：[EnterNextContainer](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/EnterNextContainer)