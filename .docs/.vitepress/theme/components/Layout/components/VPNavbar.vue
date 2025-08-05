<template>
  <div class="vp-navbar">
    <div class="vp-navbar-content">
      <div class="vp-navbar-left">
        <a href="/" class="vp-navbar-logo">
          <img
            v-if="site.logo"
            :src="site.logo"
            :alt="site.title"
            class="vp-navbar-logo-img"
          >
          <span class="vp-navbar-logo-text">{{ site.title }}</span>
        </a>
      </div>

      <div class="vp-navbar-center">
        <nav class="vp-navbar-nav">
          <a
            v-for="item in site.themeConfig?.nav || []"
            :key="item.text"
            :href="item.link"
            class="vp-navbar-nav-item"
          >
            {{ item.text }}
          </a>
        </nav>
      </div>

      <div class="vp-navbar-right">
        <button
          class="vp-navbar-toggle"
          @click="$emit('toggle')"
        >
          <svg
            class="vp-navbar-toggle-icon"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

defineProps<{ fullScreen: boolean }>()
defineEmits(['toggle'])

const { site } = useData()
</script>

<style scoped>
.vp-navbar {
  height: var(--vp-layout-top-height, 64px);
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.vp-navbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.vp-navbar-left {
  display: flex;
  align-items: center;
}

.vp-navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 16px;
}

.vp-navbar-logo-img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.vp-navbar-logo-text {
  color: var(--vp-c-text-1);
}

.vp-navbar-center {
  display: none;
}

.vp-navbar-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.vp-navbar-nav-item {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.vp-navbar-nav-item:hover {
  color: var(--vp-c-text-1);
}

.vp-navbar-right {
  display: flex;
  align-items: center;
}

.vp-navbar-toggle {
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

.vp-navbar-toggle:hover {
  background-color: var(--vp-c-bg-soft);
}

.vp-navbar-toggle-icon {
  width: 16px;
  height: 16px;
}

@media (width >= 960px) {
  .vp-navbar-center {
    display: block;
  }

  .vp-navbar-toggle {
    display: none;
  }
}
</style>
