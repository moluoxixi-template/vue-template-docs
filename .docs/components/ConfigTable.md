# ConfigTable

配置化表格组件，通过配置快速生成表格，支持分页、排序、筛选等功能。

## 基础用法

```vue
<template>
  <div>
    <ConfigTable
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConfigTable } from '@moluoxixi/components'

const columns = ref([
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
])

const tableData = ref([
  { name: '张三', age: 25, address: '北京市朝阳区' },
  { name: '李四', age: 30, address: '上海市浦东新区' }
])

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

const handleSelectionChange = (selection: any[]) => {
  console.log('选中的数据:', selection)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置 | Array | [] |
| data | 表格数据 | Array | [] |
| pagination | 分页配置 | Object | null |
| loading | 加载状态 | Boolean | false |
| selection | 是否支持多选 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| selection-change | 选择项发生变化时触发 | selection |
| current-change | 当前页发生变化时触发 | currentPage |
| size-change | 每页显示条数发生变化时触发 | pageSize |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义列内容 |
| header | 表格头部内容 |
| footer | 表格底部内容 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| refresh | 刷新表格数据 | Function |
| clearSelection | 清空选中项 | Function |

## 源码

查看组件源码：[ConfigTable](https://github.com/componentProject/vue-component/tree/main/packages/components/ConfigTable)