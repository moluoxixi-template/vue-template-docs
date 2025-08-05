<template>
  <div class="App">
    <VPSkipLink />
    <VPOverlay
      class="overlay"
      :show="isSidebarOpen"
      @click="toggleSidebar(false)"
    />
    <VPNav />
    <VPSubNav
      v-if="hasSidebar"
      :is-sidebar-open="isSidebarOpen"
      @open-menu="toggleSidebar(true)"
    />
    <VPSidebar :open="isSidebarOpen" @close="toggleSidebar(false)">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </VPSidebar>
    <VPContent>
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </VPContent>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { isClient, useEventListener, useToggle } from '@vueuse/core'
import { EVENT_CODE } from 'element-plus'
import { useSidebar } from './composables/sidebar'
import { useToggleWidgets } from './composables/toggle-widgets'
import { breakpoints } from './constant'
import VPOverlay from './components/VPOverlay.vue'
import VPSkipLink from './components/VPSkipLink.vue'
import VPNav from './components/VPNav.vue'
import VPSubNav from './components/VPSubNav.vue'
import VPSidebar from './components/VPSidebar.vue'
import VPContent from './components/VPContent.vue'

const [isSidebarOpen, toggleSidebar] = useToggle(false)
const { hasSidebar } = useSidebar()

useToggleWidgets(isSidebarOpen, () => {
  if (!isClient)
    return

  if (window.outerWidth >= breakpoints.lg) {
    toggleSidebar(false)
  }
})

useEventListener('keydown', (e) => {
  if (!isClient)
    return
  if (e.code === EVENT_CODE.esc && isSidebarOpen.value) {
    toggleSidebar(false)
    document.querySelector<HTMLButtonElement>('.sidebar-button')?.focus()
  }
})

onMounted(async () => {
  if (!isClient)
    return

  navigator?.serviceWorker?.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
})
</script>

<style scoped>
.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
  z-index: 999;
}
</style>
