<template>
  <div class="space-y-4">
    <div class="text-sm text-gray-600">
      演示 <code>type</code> 的四种常见取值：<code>date</code>、<code>datetime</code>、<code>daterange</code>、<code>datetimerange</code>。
      组件会根据不同类型自动设置显示格式与默认时间段（时间类型会默认设置开始00:00:00和结束23:59:59）。
      注意：<code>@change</code> 事件在单日期类型下会返回单个字符串，在范围类型下返回字符串数组；而 <code>v-model</code> 始终为字符串数组。
    </div>

    <ElConfigProvider :locale="zhCn" :empty-values="[undefined]">
      <div class="grid grid-cols-1 gap-4">
        <div class="border p-3 rounded">
          <div class="mb-2 font-medium">type = "date"（单日期）</div>
          <DateRangePicker
            v-model="valDate"
            type="date"
            placeholder="请选择日期"
            @change="onChange('date')"
          />
          <div class="mt-2 text-xs text-gray-500">v-model：{{ valDate }}</div>
          <div class="mt-1 text-xs text-gray-500">最近一次 change：{{ lastChange.date }}</div>
        </div>

        <div class="border p-3 rounded">
          <div class="mb-2 font-medium">type = "datetime"（单日期时间）</div>
          <DateRangePicker
            v-model="valDatetime"
            type="datetime"
            placeholder="请选择日期时间"
            @change="onChange('datetime')"
          />
          <div class="mt-2 text-xs text-gray-500">v-model：{{ valDatetime }}</div>
          <div class="mt-1 text-xs text-gray-500">最近一次 change：{{ lastChange.datetime }}</div>
        </div>

        <div class="border p-3 rounded">
          <div class="mb-2 font-medium">type = "daterange"（日期范围）</div>
          <DateRangePicker
            v-model="valDaterange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            range-separator="至"
            @change="onChange('daterange')"
          />
          <div class="mt-2 text-xs text-gray-500">v-model：{{ valDaterange }}</div>
          <div class="mt-1 text-xs text-gray-500">最近一次 change：{{ lastChange.daterange }}</div>
        </div>

        <div class="border p-3 rounded">
          <div class="mb-2 font-medium">type = "datetimerange"（日期时间范围）</div>
          <DateRangePicker
            v-model="valDatetimerange"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            @change="onChange('datetimerange')"
          />
          <div class="mt-2 text-xs text-gray-500">v-model：{{ valDatetimerange }}</div>
          <div class="mt-1 text-xs text-gray-500">最近一次 change：{{ lastChange.datetimerange }}</div>
        </div>
      </div>
    </ElConfigProvider>
  </div>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElConfigProvider } from 'element-plus'

const valDate = ref<string[]>([])
const valDatetime = ref<string[]>([])
const valDaterange = ref<string[]>([])
const valDatetimerange = ref<string[]>([])

const lastChange = reactive<Record<string, any>>({
  date: null,
  datetime: null,
  daterange: null,
  datetimerange: null,
})

function onChange(key: keyof typeof lastChange) {
  return (val: any) => {
    lastChange[key] = val
  }
}
</script>


