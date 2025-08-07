<template>
  <div>
    <DateRangePicker
      v-model="dateValue"
      type="daterange"
      placeholder="请选择日期范围"
      @change="handleDateChange"
    />
    <div class="mt-2">
      选择的日期: {{ dateValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref([])

function handleDateChange(value: any) {
  console.log('日期变化:', value)
}
</script>
