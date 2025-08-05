<template>
  <div class="vp-doc-content">
    <div class="vp-doc-content-container">
      <div class="vp-doc-content-main">
        <slot name="content-top" />
        <div class="vp-doc-content-content">
          <Content />
        </div>
        <slot name="content-bottom" />
      </div>

      <aside class="vp-doc-content-aside">
        <slot name="aside-top" />
        <slot name="aside-mid" />
        <slot name="aside-bottom" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const { page } = useData()
</script>

<style scoped>
.vp-doc-content {
  padding: 32px 24px;
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.vp-doc-content-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 64px;
  align-items: start;
}

.vp-doc-content-main {
  min-width: 0;
}

.vp-doc-content-content {
  max-width: 100%;
}

.vp-doc-content-aside {
  position: sticky;
  top: 100px;
  height: fit-content;
}

@media (width <= 1280px) {
  .vp-doc-content-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .vp-doc-content-aside {
    position: static;
  }
}

@media (width <= 640px) {
  .vp-doc-content {
    padding: 16px;
  }
}
</style>
