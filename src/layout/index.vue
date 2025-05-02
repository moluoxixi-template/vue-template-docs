<template>
  <component :is="layout" />
</template>
<script setup>
import element from './element.vue'
import { useLayoutStore } from '@/stores/layout.js'
const layoutMap = {
  element
}
const layoutInfo = useLayoutStore()
const layoutType = computed(() => layoutInfo.layout)
const layout=computed(() => layoutMap[layoutType.value])
</script>

<style lang="scss" scoped></style>
