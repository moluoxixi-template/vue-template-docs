<template>
  <div class="container">
    <PopoverTableSelect
      v-model="visible"
      pop-type="input"
      :data="tableData"
      :columns="columns"
      :throttle="500"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const tableData = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
])
const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: '姓名' },
])
</script>

<style scoped>
.container { padding: 8px; }
</style>


