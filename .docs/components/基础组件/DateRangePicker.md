# DateRangePicker

## 组件示例

日期范围选择器组件，支持选择日期/日期范围，统一格式化与默认值处理，提供快捷选项与禁用规则。

### 基础用法

:::demo
DateRangePicker/base
:::

### 类型（type）
- date：单日期；change 返回单个字符串，v-model 始终为字符串数组
- datetime：单日期时间；同date
- daterange：日期范围；change 返回字符串数组
- datetimerange：日期时间范围；同daterange

:::demo
DateRangePicker/type/type-date
:::

:::demo
DateRangePicker/type/type-datetime
:::

:::demo
DateRangePicker/type/type-daterange
:::

:::demo
DateRangePicker/type/type-datetimerange
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | Array | [] |
| type | 日期选择类型 | String | 'date' |
| format | 显示在输入框中的格式 | String | null |
| valueFormat | 绑定值的格式（对显示无效） | String | 'YYYY-MM-DD HH:mm:ss' |
| placeholder | 非范围选择时的占位内容 | String | '请选择日期' |
| startPlaceholder | 范围选择时开始日期的占位内容 | String | '开始日期' |
| endPlaceholder | 范围选择时结束日期的占位内容 | String | '结束日期' |
| rangeSeparator | 范围分隔符 | String | '至' |
| defaultDatetimeRange | date/datetime 是否默认补齐 00:00:00/23:59:59 | Boolean | null |
| defaultToday | 当无选定值时是否默认返回今天的日期范围 | Boolean | true |
| dateRange | 日期范围配置，数字或 [n,m] | Number \| Number[] \| null | null |
| dateRangeType | 日期范围类型 | Moment.unitOfTime.DurationConstructor | 'day' |
| dateRangeBaseDate | 日期范围的基准日期 | String \| Object | 当前日期 |
| minDate | 最小可选日期 | String \| Object | null |
| maxDate | 最大可选日期 | String \| Object | null |
| disabledDateRange | 禁用日期范围，[minDate, maxDate] | Array | null |
| datetimeDisableTypes | datetime 的时分秒禁用规则 | Array<'hours' \| 'minutes' \| 'seconds'> | ['hours','minutes','seconds'] |
| shortcuts | 是否显示快速选择，或自定义快捷项 | Boolean \| Array | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值更新 | (value: string[] \| string) |
| change | 用户确认选定的值时触发 | (value: string[] \| string) |

### Slots

该组件不提供插槽。

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | Function |
| blur | 使 input 失去焦点 | Function |

### 源码

查看组件源码：[DateRangePicker](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/DateRangePicker)