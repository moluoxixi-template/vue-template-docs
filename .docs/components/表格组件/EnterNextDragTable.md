# EnterNextDragTable

支持回车跳转和拖拽的表格组件，结合了EnterNextContainer和DraggableTable的功能。

## 基础用法

:::demo
EnterNextDragTable/base
:::

## API

### Props

| 参数 | 说明      | 类型               | 默认值 |
| --- |---------|------------------|-----|
| containerType | 作为容器的类型 | row\| column | row |

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

| 名称          | 说明                            | 类型       |
| ----------- | ----------------------------- | -------- |
| getTableRef | 获取 DraggableTable 实例          | Function |
| refreshRows | 刷新表格，重新收集元素，用于监视失败，无法回车下一个时调用 | Function |

## 源码

查看组件源码：[EnterNextDragTable](https://github.com/componentProject/vue-component/tree/vueComponent/packages/components/EnterNextDragTable)