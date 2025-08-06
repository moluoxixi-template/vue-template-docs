# EnterNextTable

支持回车跳转功能的表格组件，基于Element Plus表格封装，支持按回车键在可编辑单元格之间跳转。

## 基础用法

:::demo
EnterNextTable/base
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | Array | [] |
| columns | 表格列配置 | Array | [] |
| border | 是否带有边框 | Boolean | true |
| stripe | 是否为斑马纹表格 | Boolean | true |
| height | 表格的高度 | String/Number | - |
| maxHeight | 表格的最大高度 | String/Number | - |
| size | 表格的尺寸 | String | 'default' |
| allowNextWhenNoAriaActive | 当为true时，即使元素的aria-activedescendant没有值，也允许跳转到下一个元素 | Boolean | false |

### columns 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 对应列内容的字段名 | String | - |
| label | 显示的标题 | String | - |
| width | 对应列的宽度 | String/Number | - |
| minWidth | 对应列的最小宽度 | String/Number | - |
| fixed | 列是否固定 | String/Boolean | - |
| sortable | 对应列是否可以排序 | Boolean/String | false |
| align | 对齐方式 | String | 'left' |
| editable | 是否可编辑 | Boolean | false |
| type | 编辑类型，可选值：'input', 'select', 'date', 'datetime' | String | 'input' |
| options | 当type为select时的选项列表 | Array | [] |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| cell-change | 单元格值改变时触发 | ({ row, column, value, oldValue }) |
| noNextInput | 当没有下一个输入元素时触发 | ({ row, rowIndex }) |
| noSelectValue | 当select下拉框没有选中值时但按了回车触发 | ({ row, rowIndex, colIndex }) |
| selection-change | 当选择项发生变化时会触发该事件 | (selection) |
| current-change | 当表格的当前行发生变化的时候会触发该事件 | (currentRow, oldCurrentRow) |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getTableRef | 获取表格实例 | Function |
| refreshRows | 手动刷新行元素收集 | Function |
| addRow | 添加新行 | Function |

## 源码

查看组件源码：[EnterNextTable](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/EnterNextTable)