<template>
  <ElSplitter :layout="props.layout" @resize="onResize">
    <ElSplitterPanel
      v-for="(slotName) in slotNames"
      :key="slotName"
    >
      <slot :name="slotName" />
    </ElSplitterPanel>
  </ElSplitter>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { ElSplitter, ElSplitterPanel } from 'element-plus'

// 定义组件选项
defineOptions({
  name: 'WlSplitter',
  inheritAttrs: false,
})

// 定义属性和事件
const props = withDefaults(defineProps<{
  layout?: 'horizontal' | 'vertical'
  size?: string
}>(), {
  layout: 'horizontal',
  size: '100%',
})

// 定义事件
const emits = defineEmits<{
  (e: 'resize', sizes: number[]): void
}>()

// 获取可用的插槽名称
const slots = useSlots()

// 获取插槽名称
const slotNames = computed(() => Object.keys(slots))

// 处理大小调整事件
function onResize(index: number, sizes: number[]) {
  emits('resize', sizes)
}
</script>

<style scoped>
</style>
