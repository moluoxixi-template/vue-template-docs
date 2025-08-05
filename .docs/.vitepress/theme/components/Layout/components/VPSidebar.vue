<template>
  <el-scrollbar v-if="hasSidebar" class="sidebar" :class="{ open }">
    <aside>
      <slot name="top" />
      <div class="sidebar-groups">
        <section
          v-for="(item, key) of sidebars"
          :key="key"
          class="sidebar-group"
        >
          <p class="sidebar-group__title">
            {{ item.text }}
          </p>
          <VPSidebarLink
            v-for="(child, childKey) in item.children"
            :key="childKey"
            :item="child"
            @close="$emit('close')"
          />
        </section>
      </div>
      <slot name="bottom" />
    </aside>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useSidebar } from '../composables/sidebar'
import VPSidebarLink from './VPSidebarLink.vue'

defineProps<{ open: boolean }>()
defineEmits(['close'])

const { sidebars, hasSidebar } = useSidebar()
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--vp-layout-top-height, 0);
  left: 0;
  z-index: 998;
  height: calc(100vh - var(--vp-layout-top-height, 0px));
  width: var(--vp-sidebar-width);
  background-color: var(--vp-c-bg);
  border-right: 1px solid var(--vp-c-divider);
  transition: transform 0.2s ease;
  transform: translateX(-100%);
}

.sidebar.open {
  transform: translateX(0);
}

aside {
  height: 100%;
  padding: 24px 0;
}

.sidebar-groups {
  padding: 0 12px;
}

.sidebar-group {
  margin-bottom: 24px;
}

.sidebar-group__title {
  padding: 0 12px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (width >= 960px) {
  .sidebar {
    transform: translateX(0);
  }
}
</style>
