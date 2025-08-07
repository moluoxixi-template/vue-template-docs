# PopoverTableSelect

弹出表格选择器组件，支持在弹出层中显示表格数据进行选择。

## 基础用法

:::demo
PopoverTableSelect/base
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 控制弹出层显示状态 | Boolean | false |
| debounce | 防抖延迟时间（毫秒） | Number | 0 |
| throttle | 节流延迟时间（毫秒） | Number | 300 |
| options | 防抖节流的配置选项 | Object | {} |
| popType | 弹出类型 | 'default' \| 'input' | 'default' |
| placeholder | 占位文本 | String | '点击或按下方向键试试' |
| inputProps | 输入框属性配置 | Object | {} |
| inputValue | 输入框的值 | String | '' |
| virtualRef | 虚拟引用元素 | ComponentPublicInstance \| ComponentInternalInstance \| InputInstance \| HTMLElement \| null | null |
| successiveShowType | 连续显示触发类型 | 'enter' \| 'select' \| 'input' | '' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| focus | 输入框获得焦点时触发 | - |
| input | 输入框输入时触发 | (value: string) |
| blur | 输入框失去焦点时触发 | - |
| enter | 按下回车键时触发 | (selectedRow: any) |

### Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 弹出层默认内容 | - |
| [动态插槽] | 透传给内部DraggableTable的插槽 | 根据DraggableTable的插槽参数 |

### Expose

该组件没有暴露任何方法或属性。

## 源码

查看组件源码：[PopoverTableSelect](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/PopoverTableSelect)