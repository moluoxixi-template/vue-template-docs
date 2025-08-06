<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">基础表格</h3>
      <div class="mb-2 text-sm text-gray-600">
        支持回车键在可编辑单元格之间跳转的表格
      </div>
      <EnterNextDragTable
        v-model="tableData"
        :columns="columns"
        height="300"
        editable
        @noNextInput="handleNoNextInput"
      />
      <div v-if="message" class="mt-2 p-2 bg-blue-100 rounded text-sm text-blue-600">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', salary: 8000 },
  { id: 2, name: '李四', age: 30, department: '产品部', salary: 9000 },
  { id: 3, name: '王五', age: 28, department: '设计部', salary: 7500 },
  { id: 4, name: '赵六', age: 26, department: '运营部', salary: 6500 }
])

const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  {
    field: 'name',
    title: '姓名',
    width: 120,
    editRender: { name: 'input' }
  },
  {
    field: 'age',
    title: '年龄',
    width: 100,
    editRender: { name: 'input', props: { type: 'number' } }
  },
  {
    field: 'department',
    title: '部门',
    width: 120,
    editRender: { name: 'input' }
  },
  {
    field: 'salary',
    title: '薪资',
    width: 100,
    editRender: { name: 'input', props: { type: 'number' } }
  }
])

const message = ref('')

const handleNoNextInput = (element) => {
  message.value = '已到达最后一个可编辑单元格'
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>
