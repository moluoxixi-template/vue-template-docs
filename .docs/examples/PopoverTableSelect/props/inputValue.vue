<template>
  <div class="container">
    <PopoverTableSelect
      v-model="visible"
      pop-type="input"
      :data="tableData"
      :columns="columns"
      :input-value="val"
    />
    <div class="value">受控值：{{ val }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const val = ref('预设值')
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
.value { margin-top: 8px; font-size: 12px; color: #555; }
</style>


