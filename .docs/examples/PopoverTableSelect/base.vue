<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        基础用法
      </h3>
      <div class="mb-2 text-sm text-gray-600">
        点击输入框弹出表格选择器，支持单选模式
      </div>
      <div class="flex items-center space-x-4">
        <PopoverTableSelect
          v-model="selectedValue"
          :table-data="tableData"
          :columns="columns"
          placeholder="请选择用户"
        />
        <div class="text-sm text-gray-600">
          选中值: {{ selectedValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedValue = ref(false)

const tableData = ref([
  { id: 1, name: '张三', age: 25, department: '技术部', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, department: '产品部', email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, department: '设计部', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', age: 26, department: '运营部', email: 'zhaoliu@example.com' },
  { id: 5, name: '钱七', age: 32, department: '市场部', email: 'qianqi@example.com' },
])

const columns = ref([
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'email', label: '邮箱', width: 180 },
])
</script>
