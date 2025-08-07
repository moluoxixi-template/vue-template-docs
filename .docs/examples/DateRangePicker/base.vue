<template>
  <DateRangePicker
    v-model="dateValue"
    type="daterange"
    placeholder="请选择日期范围"
    @change="handleDateChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref([])

function handleDateChange(value: any) {
  console.log('日期变化:', value)
}
</script>
