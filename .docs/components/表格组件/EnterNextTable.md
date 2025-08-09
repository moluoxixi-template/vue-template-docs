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
| allowSelectNextInEmpty | 是否允许在select没有选中值时跳转 | Boolean | false |
| containerType | 容器类型，用于确定EnterNextContainer的作用范围 | 'row' \| 'table' | 'row' |
| ...attrs | 其他属性会透传给内部的ElTable组件 | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| noNextInput | 当没有下一个输入元素时触发 | ({ row, rowIndex, colIndex }) |
| noSelectValue | 当select下拉框没有选中值时但按了回车触发 | ({ row, rowIndex, colIndex }) |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 表格列内容，通常用于放置el-table-column组件 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| refreshRows | 手动刷新行元素收集 | Function |
| - | 该组件未暴露其它方法 | - |

## 源码

查看组件源码：[EnterNextTable](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/EnterNextTable)