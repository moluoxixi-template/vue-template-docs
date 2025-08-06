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
| modelValue | 绑定值 | String/Number/Array | - |
| multiple | 是否多选 | Boolean | false |
| placeholder | 占位文本 | String | '请选择' |
| disabled | 是否禁用 | Boolean | false |
| clearable | 是否可清空 | Boolean | true |
| popoverWidth | 弹出层宽度 | String/Number | '600px' |
| popoverHeight | 弹出层高度 | String/Number | '400px' |
| tableData | 表格数据 | Array | [] |
| columns | 表格列配置 | Array | [] |
| valueKey | 作为value的字段名 | String | 'value' |
| labelKey | 作为label的字段名 | String | 'label' |
| showSearch | 是否显示搜索框 | Boolean | false |
| searchPlaceholder | 搜索框占位文本 | String | '请输入关键字搜索' |

### columns 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 对应列内容的字段名 | String | - |
| label | 显示的标题 | String | - |
| width | 对应列的宽度 | String/Number | - |
| minWidth | 对应列的最小宽度 | String/Number | - |
| fixed | 列是否固定 | String/Boolean | - |
| align | 对齐方式 | String | 'left' |
| formatter | 用来格式化内容 | Function | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | (value, selectedRows) |
| select | 选中某一行时触发 | (selection, row) |
| select-all | 用户手动勾选全选时触发 | (selection) |
| visible-change | 弹出层显示隐藏时触发 | (visible) |

### Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 自定义触发器内容 | - |
| [column.prop] | 自定义列内容 | { row, column, $index } |
| search | 自定义搜索区域 | - |
| footer | 自定义弹出层底部内容 | - |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使input获取焦点 | Function |
| blur | 使input失去焦点 | Function |
| getTableRef | 获取表格实例 | Function |

## 源码

查看组件源码：[PopoverTableSelect](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/PopoverTableSelect)