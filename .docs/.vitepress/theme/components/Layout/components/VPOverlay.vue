<template>
  <div
    v-if="show"
    class="vp-overlay"
    @click="$emit('click')"
  />
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
defineEmits(['click'])
</script>

<style scoped>
.vp-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
  z-index: 997;
}

@media (width >= 960px) {
  .vp-overlay {
    display: none;
  }
}
</style>
