# DraggableTable

可拖拽表格组件，基于VXE-Grid封装，支持行列拖拽、编辑、过滤等功能。

## 组件示例


### 编辑（editable / editAutoFocus / editRules / editConfig）

示例：开启编辑（editable=true）
:::demo
DraggableTable/edit/editable
:::

示例：关闭编辑模式自动聚焦（editAutoFocus=false）
:::demo
DraggableTable/edit/editAutoFocus
:::

### 过滤（filterable / filterType / filterLayout / filterConfig）

示例：开启过滤（filterable=true）
:::demo
DraggableTable/filter/filterable
:::

示例：过滤类型（filterType='full'）
:::demo
DraggableTable/filter/filterType
:::

示例：过滤布局（filterLayout=['input','checkbox','select']）
:::demo
DraggableTable/filter/filterLayout
:::

### 拖拽（dragType / dragable / rowdragable / columndragable / rowDisabledClass / rowDragDisabledMethod / columnDragDisabledMethod）

示例：VXE 拖拽模式（dragType='vxe'，启用行列拖拽）
:::demo
DraggableTable/drag/dragType-vxe
:::

示例：原生拖拽模式（dragType='draggable'，dragable=true）
:::demo
DraggableTable/drag/dragType-draggable
:::

示例：禁用指定行拖拽（rowDisabledClass）
:::demo
DraggableTable/drag/rowDisabledClass
:::

示例：通过回调禁用某些行拖拽（rowDragDisabledMethod）
:::demo
DraggableTable/drag/rowDragDisabledMethod
:::

示例：通过回调拦截列拖拽（columnDragDisabledMethod）
:::demo
DraggableTable/drag/columnDragDisabledMethod
:::

### 排序（sortable / sortConfig）

示例：启用全局排序（sortable=true）
:::demo
DraggableTable/sort/sortable
:::

### 插槽（动态命名插槽与内置前缀插槽）

示例：默认（字段）插槽
:::demo
DraggableTable/slots/defaultSlot
:::

示例：表头插槽（header-name）
:::demo
DraggableTable/slots/headerSlot
:::

示例：编辑插槽（edit-name）
:::demo
DraggableTable/slots/editSlot
:::

示例：过滤插槽（filter-name）
:::demo
DraggableTable/slots/filterSlot
:::

### 事件

示例：行拖拽完成（rowDragend）
:::demo
DraggableTable/events/rowDragend
:::

示例：列拖拽完成（columnDragend）
:::demo
DraggableTable/events/columnDragend
:::

示例：列宽变化（resizableChange）
:::demo
DraggableTable/events/resizableChange
:::

示例：复选框（checkboxChange / checkboxAll）
:::demo
DraggableTable/events/checkbox
:::

示例：表头菜单与右键（headerCellMenu / headerContextMenu）
:::demo
DraggableTable/events/headerMenu
:::

### 暴露方法（getTable）

示例：通过 ref 获取 VXE 表格实例
:::demo
DraggableTable/expose/getTable
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 表格数据 | Array | [] |
| id | 表格唯一ID，用于本地存储识别 | String | - |
| border | 是否显示表格边框 | Boolean | true |
| showOverflow | 表格内容溢出隐藏并显示 tooltip | Boolean\|String | true |
| showHeaderOverflow | 头部溢出隐藏并显示 tooltip | Boolean\|String | true |
| showFooterOverflow | 底部溢出隐藏并显示 tooltip | Boolean\|String | true |
| resizable | 是否允许列宽拖拽 | Boolean | true |
| autoResize | 是否自动调整列宽 | Boolean | true |
| resizableConfig | 列宽拖拽配置 | Object | {} |
| editable | 是否允许编辑 | Boolean | false |
| editAutoFocus | 触发编辑后是否自动聚焦 | Boolean | true |
| editRules | 编辑规则 | Object | null |
| editConfig | 编辑配置 | Object | {} |
| filterable | 是否启用过滤功能 | Boolean | false |
| filterType | 过滤类型 | String | 'filter' |
| filterLayout | 筛选器布局配置，支持 input、checkbox、select | Array | ['input','checkbox'] |
| filterConfig | 过滤配置 | Object | {} |
| dragable | 是否启用拖拽（行列都启用） | Boolean | false |
| rowdragable | 是否启用行拖拽 | Boolean | false |
| columndragable | 是否启用列拖拽 | Boolean | false |
| dragType | 拖拽模式（'vxe'\|'draggable'） | String | 'vxe' |
| rowDisabledClass | 需要禁用拖拽的行class | String | '' |
| rowDragDisabledMethod | 行拖拽禁用方法 | Function | - |
| rowDragEndMethod | 行拖拽结束回调方法 | Function | - |
| rowDragConfig | 行拖拽配置对象 | Object | {} |
| columnDragDisabledMethod | 列拖拽禁用方法 | Function | - |
| columnDragEndMethod | 列拖拽结束回调方法 | Function | - |
| columnDragConfig | 列拖拽配置对象 | Object | {} |
| rowId | 行的唯一标识字段 | String | '_X_ROW_KEY' |
| rowConfig | 行配置对象 | Object | {} |
| columns | 列配置数组 | Array\<ColumnType\> | [] |
| columnConfig | 列配置对象 | Object | {} |
| virtualXConfig | 列虚拟滚动配置 | Object | {} |
| virtualYConfig | 行虚拟滚动配置 | Object | {} |
| menuConfigColumn | 头部右键菜单是否允许配置列隐藏显示 | Boolean | true |
| menuConfig | 右键菜单配置 | Object | {} |
| sortable | 是否启用排序 | Boolean | false |
| sortConfig | 排序配置 | Object | {} |
| customConfig | 自定义配置 | Object | { storage: true } |
| mouseConfig | 鼠标配置 | Object | {} |
| pageType | 分页类型 | String | 'el-pagination' |
| pagerConfig | 分页配置 | Object | null |

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
| columnDragend | 列拖拽完成事件 | (params: ColumnDragendParams) |
| rowDragend | 行拖拽完成事件 | (params: RowDragendParams) |
| resizableChange | 列宽变化事件 | (params: ResizableChangeParams) |
| checkboxChange | 复选框变化事件 | (params: CheckboxChangeParams) |
| checkboxAll | 复选框全选事件 | (params: CheckboxAllParams) |
| headerCellMenu | 表头右键菜单事件 | (params: HeaderCellMenuParams) |
| pageChange | 分页变化事件 | (params: PageChangeParams) |
| headerContextMenu | 表头右键菜单显示事件 | (params: HTMLElement) |

### Slots

> 组件支持动态插槽，会自动根据列配置和插槽名称进行匹配。插槽名称遵循 `${type}-${field}` 的命名规则。

| 插槽名                 | 说明                | 参数         |
| ------------------- | ----------------- | ---------- |
| loading             | 自定义加载状态内容         | params     |
| pager               | 自定义分页器内容          | -          |
| `${field}`          | 列默认插槽，field为列字段名  | slotParams |
| `header-${field}`   | 列表头插槽，field为列字段名  | slotParams |
| `footer-${field}`   | 列底部插槽，field为列字段名  | slotParams |
| `title-${field}`    | 列标题插槽，field为列字段名  | slotParams |
| `checkbox-${field}` | 复选框插槽，field为列字段名  | slotParams |
| `radio-${field}`    | 单选框插槽，field为列字段名  | slotParams |
| `content-${field}`  | 展开内容插槽，field为列字段名 | slotParams |
| `filter-${field}`   | 筛选器插槽，field为列字段名  | slotParams |
| `edit-${field}`     | 编辑器插槽，field为列字段名  | slotParams |
| `valid-${field}`    | 验证插槽，field为列字段名   | slotParams |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getTable | 获取VXE-Grid实例，可调用VXE-Grid的所有方法 | () => VxeGridInstance |

## 源码

查看组件源码：[DraggableTable](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/DraggableTable)