# DraggableTable

可拖拽表格组件，支持行和列的拖拽排序，提供丰富的拖拽交互功能。

## 基础用法

```vue
<template>
  <div>
    <DraggableTable
      :columns="columns"
      :data="tableData"
      :draggable="true"
      @row-drop="handleRowDrop"
      @column-drop="handleColumnDrop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DraggableTable } from '@moluoxixi/components'

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
])

const tableData = ref([
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' }
])

const handleRowDrop = (dragIndex: number, dropIndex: number) => {
  console.log('行拖拽:', dragIndex, '->', dropIndex)
  const dragRow = tableData.value.splice(dragIndex, 1)[0]
  tableData.value.splice(dropIndex, 0, dragRow)
}

const handleColumnDrop = (dragIndex: number, dropIndex: number) => {
  console.log('列拖拽:', dragIndex, '->', dropIndex)
  const dragColumn = columns.value.splice(dragIndex, 1)[0]
  columns.value.splice(dropIndex, 0, dragColumn)
}
</script>
```

## 行拖拽

```vue
<template>
  <div>
    <DraggableTable
      :columns="columns"
      :data="tableData"
      :row-draggable="true"
      :column-draggable="false"
      drag-handle=".drag-handle"
      @row-drop="handleRowDrop"
    >
      <template #drag-handle>
        <el-icon class="drag-handle" style="cursor: move;">
          <Sort />
        </el-icon>
      </template>
    </DraggableTable>
  </div>
</template>
```

## 列拖拽

```vue
<template>
  <div>
    <DraggableTable
      :columns="columns"
      :data="tableData"
      :row-draggable="false"
      :column-draggable="true"
      @column-drop="handleColumnDrop"
    />
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置 | Array | [] |
| data | 表格数据 | Array | [] |
| rowDraggable | 是否启用行拖拽 | Boolean | true |
| columnDraggable | 是否启用列拖拽 | Boolean | true |
| dragHandle | 拖拽手柄选择器 | String | '.drag-handle' |
| animation | 拖拽动画时长 | Number | 150 |
| ghostClass | 拖拽时的幽灵元素类名 | String | 'sortable-ghost' |
| chosenClass | 被选中元素的类名 | String | 'sortable-chosen' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| row-drop | 行拖拽完成时触发 | dragIndex, dropIndex |
| column-drop | 列拖拽完成时触发 | dragIndex, dropIndex |
| drag-start | 拖拽开始时触发 | event |
| drag-end | 拖拽结束时触发 | event |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义列内容 |
| drag-handle | 自定义拖拽手柄 |
| header | 表格头部内容 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| refresh | 刷新表格 | Function |
| getTableData | 获取当前表格数据 | Function |
| setTableData | 设置表格data | Function |

## 源码

查看组件源码：[DraggableTable](https://github.com/componentProject/vue-component/tree/main/packages/components/DraggableTable)