<template>
  <div class="vp-subnav">
    <button
      class="sidebar-button"
      :class="{ open: isSidebarOpen }"
      @click="$emit('open-menu')"
    >
      <svg
        class="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isSidebarOpen: boolean }>()
defineEmits(['open-menu'])
</script>

<style scoped>
.vp-subnav {
  position: fixed;
  top: var(--vp-layout-top-height, 0);
  left: 0;
  z-index: 999;
  width: 100%;
  height: 48px;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.sidebar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--vp-c-text-1);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.sidebar-button:hover {
  background-color: var(--vp-c-bg-soft);
}

.sidebar-button.open .icon {
  transform: rotate(90deg);
}

.icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

@media (width >= 960px) {
  .vp-subnav {
    display: none;
  }
}
</style>
