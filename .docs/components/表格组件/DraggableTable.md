# DraggableTable

可拖拽表格组件，基于VXE-Grid封装，支持行列拖拽、编辑、过滤等功能。

## 基础用法

:::demo
DraggableTable/base
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
| tableProps | VXE表格配置项 | Object | {} |
| rowdragable | 是否启用行拖拽 | Boolean | false |
| columndragable | 是否启用列拖拽 | Boolean | false |
| editable | 是否启用单元格编辑功能 | Boolean | false |
| filterable | 是否启用列筛选功能 | Boolean | false |
| filterLayout | 筛选器布局配置 | Array | ['input', 'checkbox'] |

### columns 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| field | 字段名，对应数据中的key | String | - |
| title | 列标题 | String | - |
| width | 列宽度 | Number/String | - |
| minWidth | 最小列宽度 | Number/String | - |
| fixed | 列固定位置，可选值: 'left', 'right' | String | - |
| sortable | 是否可排序 | Boolean | false |
| align | 对齐方式，可选值: 'left', 'center', 'right' | String | 'left' |
| slot | 自定义插槽名称 | String | - |
| editRender | 编辑渲染器配置 | Object | - |
| filterRender | 筛选渲染器配置 | Object | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:tableData | 表格数据更新事件 | (newData: Array) |
| update:columns | 列配置更新事件 | (newColumns: Array) |
| row-dragend | 行拖拽完成事件 | ({ oldIndex, newIndex, row }) |
| column-dragend | 列拖拽完成事件 | ({ oldIndex, newIndex, column }) |
| cell-change | 单元格值改变事件 | (params) |

### Slots

组件支持动态插槽，插槽名通过columns配置中的slot属性指定。

插槽规则：
- `${field}`: 默认插槽
- `header-${field}`: 表头插槽
- `edit-${field}`: 编辑插槽
- `filter-${field}`: 筛选插槽

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getTable | 获取VXE-Grid实例 | Function |

## 源码

查看组件源码：[DraggableTable](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/DraggableTable)