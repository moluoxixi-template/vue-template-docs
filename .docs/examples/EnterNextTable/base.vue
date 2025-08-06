<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        基础表格
      </h3>
      <div class="mb-2 text-sm text-gray-600">
        基于Element Plus表格，支持回车键在可编辑单元格之间跳转
      </div>
      <EnterNextTable
        :data="tableData"
        :columns="columns"
        height="300"
        @no-next-input="handleNoNextInput"
      >
        <ElTableColumn
          v-for="column in columns"
          :key="column.prop"
          :label="column.label"
          :width="column.width"
        >
          <template #default="scope">
            <el-input
              v-if="column.type === 'input'"
              v-model="scope.row[column.prop]"
            />
            <span v-else>{{ scope.row[column.prop] }}</span>
          </template>
        </ElTableColumn>
      </EnterNextTable>
      <div v-if="message" class="mt-2 p-2 bg-blue-100 rounded text-sm text-blue-600">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTableColumn } from 'element-plus'

const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', department: '技术部' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', department: '产品部' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', department: '设计部' },
  { id: 4, name: '赵六', age: 26, email: 'zhaoliu@example.com', department: '运营部' },
])

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120, editable: true, type: 'input' },
  { prop: 'age', label: '年龄', width: 100, editable: true, type: 'input' },
  { prop: 'email', label: '邮箱', width: 180, editable: true, type: 'input' },
  { prop: 'department', label: '部门', width: 120, editable: true, type: 'input' },
])

const message = ref('')

function handleNoNextInput({ rowIndex }) {
  message.value = `已到达第${rowIndex + 1}行最后一个可编辑单元格`
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>
