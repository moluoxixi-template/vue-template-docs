<template>
  <div class="container">
    <PopoverTableSelect v-model="visible" :data="tableData" :columns="columns" pop-type="input">
      <template #default>
        <div style="margin: 8px 0">
          <ElSelect v-model="selected" :teleported="false" placeholder="请选择">
            <ElOption label="选项1" value="1" />
            <ElOption label="选项2" value="2" />
          </ElSelect>
        </div>
      </template>
    </PopoverTableSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElOption, ElSelect } from 'element-plus'

const visible = ref(false)
const selected = ref<any>(null)

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
.container {
  padding: 8px;
}
</style>
