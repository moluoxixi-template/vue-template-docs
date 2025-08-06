<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        基础表格
      </h3>
      <div style="height: 300px">
        <DraggableTable
          v-model="tableData"
          :columns="columns"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', status: '在职' },
  { id: 2, name: '李四', age: 30, department: '产品部', status: '在职' },
  { id: 3, name: '王五', age: 28, department: '设计部', status: '离职' },
  { id: 4, name: '赵六', age: 26, department: '运营部', status: '在职' },
])

const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: '姓名', width: 120 },
  { field: 'age', title: '年龄', width: 100 },
  { field: 'department', title: '部门', width: 120 },
  { field: 'status', title: '状态', width: 100 },
])
</script>
