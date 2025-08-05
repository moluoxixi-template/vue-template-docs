<template>
  <header class="navbar" :class="{ 'has-sidebar': hasSidebar }">
    <VPNavbar :full-screen="isFullScreen" @toggle="toggleFullScreen" />
    <VPNavFull :full-screen="isFullScreen" class="full-screen" @close="close" />
  </header>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { useSidebar } from '../composables/sidebar'
import { useFullScreen } from '../composables/fullscreen'
import { useToggleWidgets } from '../composables/toggle-widgets'
import { breakpoints } from '../constant'
import VPNavbar from './VPNavbar.vue'
import VPNavFull from './VPNavFull.vue'

const { hasSidebar } = useSidebar()
const { toggleFullScreen, isFullScreen } = useFullScreen()
const close = () => toggleFullScreen(false)

useToggleWidgets(isFullScreen, () => {
  if (!isClient)
    return
  if (window.outerWidth >= breakpoints.md) {
    close()
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  transition: border-color 0.5s;
}

.navbar.has-sidebar {
  border-bottom-color: var(--vp-c-divider);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}

.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
}
</style>
