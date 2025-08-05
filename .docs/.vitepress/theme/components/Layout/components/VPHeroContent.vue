<template>
  <div class="vp-hero-content">
    <div class="vp-hero-content-container">
      <h1 class="vp-hero-content-title">
        {{ frontmatter.hero?.title || '欢迎' }}
      </h1>
      <p v-if="frontmatter.hero?.tagline" class="vp-hero-content-tagline">
        {{ frontmatter.hero.tagline }}
      </p>
      <div v-if="frontmatter.hero?.actions" class="vp-hero-content-actions">
        <a
          v-for="action in frontmatter.hero.actions"
          :key="action.text"
          :href="action.link"
          class="vp-hero-content-action" :class="[
            action.theme === 'brand' ? 'vp-hero-content-action-brand' : 'vp-hero-content-action-alt',
          ]"
        >
          {{ action.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<style scoped>
.vp-hero-content {
  padding: 120px 24px 80px;
  text-align: center;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.vp-hero-content-container {
  max-width: 960px;
  margin: 0 auto;
}

.vp-hero-content-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.vp-hero-content-tagline {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.vp-hero-content-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.vp-hero-content-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.vp-hero-content-action-brand {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
}

.vp-hero-content-action-brand:hover {
  background-color: var(--vp-c-brand-dark);
}

.vp-hero-content-action-alt {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.vp-hero-content-action-alt:hover {
  background-color: var(--vp-c-bg);
}

@media (width <= 640px) {
  .vp-hero-content {
    padding: 80px 24px 60px;
  }

  .vp-hero-content-title {
    font-size: 36px;
  }

  .vp-hero-content-tagline {
    font-size: 18px;
  }
}
</style>
