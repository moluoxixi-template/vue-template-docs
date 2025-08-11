<template>
  <div class="container">
    <EnterNextDragTable
      v-model="tableData"
      :columns="columns"
      container-type="table"
      height="300"
      editable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { id: 1, a: 'A', b: 'B' },
  { id: 2, a: 'C', b: 'D' },
])

const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  { field: 'a', title: 'A' },
  { field: 'b', title: 'B', width: 120 },
])
</script>

<style scoped>
.container { padding: 8px; }
</style>


