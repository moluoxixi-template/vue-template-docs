<template>
  <a
    ref="skipLink"
    href="#page-content"
    class="vp-skip-link"
    @click="focusSkipLink"
  >
    跳转到内容
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const skipLink = ref<HTMLElement>()

function focusSkipLink() {
  skipLink.value?.focus()
}
</script>

<style scoped>
.vp-skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10000;
  padding: 8px 12px;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transform: translateY(-100%);
  transition: transform 0.2s ease;
}

.vp-skip-link:focus {
  transform: translateY(0);
}
</style>
