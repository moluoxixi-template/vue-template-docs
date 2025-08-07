# EnterNextContainer

回车自动跳转容器组件，让用户可以通过按回车键在表单输入框之间快速跳转。

## 基础用法

:::demo
EnterNextContainer/base
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| virtualRef | 外部元素引用，当提供时，将监控该元素而不是容器内部 | ComponentPublicInstance/HTMLElement | null |
| allowNextWhenNoAriaActive | 当为true时，即使元素的aria-activedescendant没有值，也允许跳转到下一个元素 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| noNextInput | 当用户在最后一个输入元素上按下Enter键，或者只有一个输入元素时触发 | element: HTMLElement |
| noSelectValue | 当select下拉框没有选中值时但按了回车触发 | {row: Object, rowIndex: Number, colIndex: Number} |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，包含需要监听的表单元素 |

## 工作原理

1. 组件使用MutationObserver监听DOM变化，实时收集所有input和select元素
2. 对每个input和select元素添加keyup事件监听器
3. 当用户按下回车键时，自动跳转到下一个输入元素
4. 如果没有下一个元素，触发`noNextInput`事件

## 源码

查看组件源码：[EnterNextContainer](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/EnterNextContainer)