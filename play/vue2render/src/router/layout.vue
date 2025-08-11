<template>
  <component :is="layout" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '@/layout/index.ts'

export default defineComponent({
  name: 'Layout',
  computed: {
    layoutType() {
      return this.$store.state.system.layout
    },
    layout() {
      return layouts[this.layoutType]
    },
  },
})
</script>

<style lang="scss" scoped></style>
