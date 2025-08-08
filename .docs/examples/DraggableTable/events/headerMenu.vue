<template>
  <div class="container">
    <DraggableTable
      v-model="tableData"
      :columns="columns"
      @header-cell-menu="lastMenu = $event"
      @header-context-menu="lastContext = $event"
    />
    <div class="value">headerCellMenu: {{ lastMenu }}</div>
    <div class="value">headerContextMenu: {{ lastContext && 'HTMLElement' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([{ id: 1, name: 'A' }])
const lastMenu = ref<any>(null)
const lastContext = ref<any>(null)

const columns = ref([
  { field: 'id', title: 'ID' },
  { field: 'name', title: '姓名' },
])
</script>

<style scoped>
.container { padding: 8px; }
.value { margin-top: 8px; font-size: 12px; color: #555; }
</style>


