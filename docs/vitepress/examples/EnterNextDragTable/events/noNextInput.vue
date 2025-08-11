<template>
  <div class="container">
    <EnterNextDragTable
      v-model="tableData"
      :columns="columns"
      height="300"
      editable
      @no-next-input="last = $event"
    />
    <div class="value">noNextInput: {{ last }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
])
const last = ref<any>(null)

const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: '姓名' },
])
</script>

<style scoped>
.container { padding: 8px; }
.value { margin-top: 8px; font-size: 12px; color: #555; }
</style>


