<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-2">
            自定义日期范围
          </h3>
          <DateRangePicker
            v-model="customRangeValue"
            type="daterange"
            :date-range="[-7, 0]"
            date-range-type="day"
            placeholder="最近7天"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            禁用日期
          </h3>
          <DateRangePicker
            v-model="disabledDateValue"
            type="daterange"
            :min-date="minDate"
            :max-date="maxDate"
            placeholder="选择日期范围（限制在指定范围内）"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            自定义快捷选项
          </h3>
          <DateRangePicker
            v-model="customShortcutsValue"
            type="daterange"
            :shortcuts="customShortcuts"
            placeholder="选择日期范围"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">
            默认值设置
          </h3>
          <DateRangePicker
            v-model="defaultValue"
            type="daterange"
            :default-today="true"
            placeholder="默认显示今天"
          />
        </div>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'

const customRangeValue = ref([])
const disabledDateValue = ref([])
const customShortcutsValue = ref([])
const defaultValue = ref([])

// 设置最小和最大日期
const minDate = moment().subtract(30, 'days').toDate()
const maxDate = moment().add(30, 'days').toDate()

// 自定义快捷选项
const customShortcuts = [
  {
    text: '最近一周',
    value: () => {
      return [moment().subtract(7, 'days'), moment()]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      return [moment().subtract(1, 'month'), moment()]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      return [moment().subtract(3, 'months'), moment()]
    },
  },
]
</script>
