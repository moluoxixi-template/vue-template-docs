<template>
  <ElConfigProvider :locale="zhCn" :empty-values="[undefined]">
    <DateRangePicker
      v-model="dateValue"
      type="daterange"
      placeholder="请选择日期范围"
      @change="handleDateChange"
    />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElConfigProvider } from 'element-plus'

const dateValue = ref([])

function handleDateChange(value: any) {
  console.log('日期变化:', value)
}
</script>
