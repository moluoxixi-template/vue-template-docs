<template>
  <div
    v-if="fullScreen"
    class="vp-nav-full"
  >
    <div class="vp-nav-full-content">
      <div class="vp-nav-full-header">
        <a href="/" class="vp-nav-full-logo">
          <img
            v-if="site.logo"
            :src="site.logo"
            :alt="site.title"
            class="vp-nav-full-logo-img"
          >
          <span class="vp-nav-full-logo-text">{{ site.title }}</span>
        </a>
        <button
          class="vp-nav-full-close"
          @click="$emit('close')"
        >
          <svg
            class="vp-nav-full-close-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav class="vp-nav-full-nav">
        <a
          v-for="item in site.themeConfig?.nav || []"
          :key="item.text"
          :href="item.link"
          class="vp-nav-full-nav-item"
          @click="$emit('close')"
        >
          {{ item.text }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

defineProps<{ fullScreen: boolean }>()
defineEmits(['close'])

const { site } = useData()
</script>

<style scoped>
.vp-nav-full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--vp-c-bg);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vp-nav-full-content {
  text-align: center;
  padding: 24px;
}

.vp-nav-full-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}

.vp-nav-full-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 20px;
}

.vp-nav-full-logo-img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.vp-nav-full-logo-text {
  color: var(--vp-c-text-1);
}

.vp-nav-full-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--vp-c-text-1);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.vp-nav-full-close:hover {
  background-color: var(--vp-c-bg-soft);
}

.vp-nav-full-close-icon {
  width: 20px;
  height: 20px;
}

.vp-nav-full-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vp-nav-full-nav-item {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 12px 0;
}

.vp-nav-full-nav-item:hover {
  color: var(--vp-c-text-1);
}
</style>
