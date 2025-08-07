<template>
  <EnterNextDragTable
    v-model="tableData"
    :columns="columns"
    height="300"
    editable
    @no-next-input="handleNoNextInput"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', salary: 8000 },
  { id: 2, name: '李四', age: 30, department: '产品部', salary: 9000 },
  { id: 3, name: '王五', age: 28, department: '设计部', salary: 7500 },
  { id: 4, name: '赵六', age: 26, department: '运营部', salary: 6500 },
])

const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  {
    field: 'name',
    title: '姓名',
    width: 120,
  },
  {
    field: 'age',
    title: '年龄',
    width: 100,
  },
  {
    field: 'department',
    title: '部门',
    width: 120,
    editRender: { name: 'input' },
  },
  {
    field: 'salary',
    title: '薪资',
  },
])

function handleNoNextInput() {
  ElMessage({
    message: '已到达最后一个输入框！',
    type: 'success',
    duration: 3000,
  })
}
</script>
