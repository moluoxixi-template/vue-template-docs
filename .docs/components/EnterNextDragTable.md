# EnterNextDragTable

支持回车跳转和拖拽的表格组件，结合了EnterNextContainer和DraggableTable的功能。

## 基础用法

:::demo
EnterNextDragTable/base
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableData | 表格数据 | Array | [] |
| columns | 表格列配置 | Array | [] |
| height | 表格高度 | String/Number | null |
| border | 是否显示边框 | Boolean | true |
| stripe | 是否显示斑马纹 | Boolean | true |
| loading | 是否显示加载状态 | Boolean | false |
| showHeader | 是否显示表头 | Boolean | true |
| rowdragable | 是否启用行拖拽 | Boolean | false |
| columndragable | 是否启用列拖拽 | Boolean | false |
| editable | 是否启用单元格编辑功能 | Boolean | false |
| filterable | 是否启用列筛选功能 | Boolean | false |
| allowNextWhenNoAriaActive | 当为true时，即使元素的aria-activedescendant没有值，也允许跳转到下一个元素 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:tableData | 表格数据更新事件 | (newData: Array) |
| update:columns | 列配置更新事件 | (newColumns: Array) |
| row-dragend | 行拖拽完成事件 | ({ oldIndex, newIndex, row }) |
| column-dragend | 列拖拽完成事件 | ({ oldIndex, newIndex, column }) |
| cell-change | 单元格值改变事件 | (params) |
| noNextInput | 当没有下一个输入元素时触发 | (element: HTMLElement) |
| noSelectValue | 当select下拉框没有选中值时但按了回车触发 | (data: Object) |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getTable | 获取VXE-Grid实例 | Function |

## 源码

查看组件源码：[EnterNextDragTable](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/EnterNextDragTable)