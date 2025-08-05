<template>
  <div class="vp-not-found">
    <div class="vp-not-found-container">
      <h1 class="vp-not-found-title">
        404
      </h1>
      <p class="vp-not-found-text">
        页面未找到
      </p>
      <a href="/" class="vp-not-found-link">
        返回首页
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { site } = useData()
</script>

<style scoped>
.vp-not-found {
  padding: 120px 24px;
  text-align: center;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.vp-not-found-container {
  max-width: 480px;
  margin: 0 auto;
}

.vp-not-found-title {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.vp-not-found-text {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

.vp-not-found-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 6px;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.vp-not-found-link:hover {
  background-color: var(--vp-c-brand-dark);
}

@media (width <= 640px) {
  .vp-not-found {
    padding: 80px 24px;
  }

  .vp-not-found-title {
    font-size: 48px;
  }

  .vp-not-found-text {
    font-size: 18px;
  }
}
</style>
