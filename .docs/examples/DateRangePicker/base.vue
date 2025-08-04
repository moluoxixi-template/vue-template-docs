<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        基础用法
      </h3>
      <DateRangePicker
        v-model="dateValue"
        type="daterange"
        placeholder="请选择日期范围"
        @change="handleDateChange"
      />
      <div class="mt-2 text-sm text-gray-600">
        选择的日期: {{ dateValue }}
      </div>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">
        带快捷选项
      </h3>
      <DateRangePicker
        v-model="dateValue2"
        type="daterange"
        :shortcuts="true"
        placeholder="请选择日期范围"
      />
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">
        日期时间范围
      </h3>
      <DateRangePicker
        v-model="dateTimeValue"
        type="datetimerange"
        placeholder="请选择日期时间范围"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref([])
const dateValue2 = ref([])
const dateTimeValue = ref([])

function handleDateChange(value: any) {
  console.log('日期变化:', value)
}
</script>
