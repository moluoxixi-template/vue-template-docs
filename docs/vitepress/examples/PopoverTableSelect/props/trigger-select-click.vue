<template>
  <div class="container">
    <ElInput v-model="val" ref="ipt" class="ipt" placeholder="单击选择并关闭" />
    <PopoverTableSelect
      v-model="visible"
      :data="tableData"
      :columns="columns"
      :virtual-ref="ipt"
      select-trigger="click"
      @select="onSelect"
    />
    <div class="value">选择值：{{ selected }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElInput } from 'element-plus'

const visible = ref(false)
const val = ref('')
const selected = ref<any>(null)
const ipt = ref()

const tableData = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
])
const columns = ref([
  { field: 'id', title: 'ID', width: 80 },
  { field: 'name', title: '姓名' },
])

function onSelect(row: any) {
  selected.value = row
}
</script>

<style scoped>
.container { padding: 8px; }
.ipt { width: 220px; }
.value { margin-top: 8px; font-size: 12px; color: #555; }
</style>


