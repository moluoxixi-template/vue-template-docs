# DateRangePicker

日期范围选择器组件，支持选择日期范围，提供多种快捷选项。

## 基础用法

:::demo
DateRangePicker/base
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | Array | null |
| placeholder | 占位文本 | String | '请选择日期范围' |
| format | 显示在输入框中的格式 | String | 'YYYY-MM-DD' |
| valueFormat | 绑定值的格式 | String | 'YYYY-MM-DD' |
| shortcuts | 设置快捷选项 | Array | [] |
| disabled | 是否禁用 | Boolean | false |
| clearable | 是否可清空 | Boolean | true |
| size | 输入框尺寸 | String | 'default' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | value |
| blur | 在组件 Input 失去焦点时触发 | event |
| focus | 在组件 Input 获得焦点时触发 | event |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义触发器 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | Function |
| blur | 使 input 失去焦点 | Function |

## 源码

查看组件源码：[DateRangePicker](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/DateRangePicker)