<template>
  <footer class="vp-footer">
    <div class="vp-footer-container">
      <div class="vp-footer-content">
        <div class="vp-footer-info">
          <p class="vp-footer-copyright">
            © {{ new Date().getFullYear() }} {{ site.title }}. All rights reserved.
          </p>
        </div>

        <div v-if="site.themeConfig?.socialLinks" class="vp-footer-social">
          <a
            v-for="link in site.themeConfig.socialLinks"
            :key="link.icon"
            :href="link.link"
            :title="link.ariaLabel"
            class="vp-footer-social-link"
            target="_blank"
            rel="noopener"
          >
            <component :is="link.icon" class="vp-footer-social-icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()
</script>

<style scoped>
.vp-footer {
  margin-top: 64px;
  padding: 32px 24px;
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.vp-footer-container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.vp-footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.vp-footer-info {
  flex: 1;
}

.vp-footer-copyright {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.vp-footer-social {
  display: flex;
  align-items: center;
  gap: 16px;
}

.vp-footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-2);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.vp-footer-social-link:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.vp-footer-social-icon {
  width: 16px;
  height: 16px;
}

@media (width <= 640px) {
  .vp-footer {
    padding: 24px 16px;
  }

  .vp-footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .vp-footer-social {
    align-self: flex-end;
  }
}
</style>
