<template>
  <main
    id="page-content"
    class="page-content" :class="{ 'has-sidebar': hasSidebar }"
  >
    <VPHeroContent v-if="isHeroPost" />
    <VPDocContent v-else>
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
    </VPDocContent>
    <VPFooter v-if="!isHeroPost" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useSidebar } from '../composables/sidebar'
import VPHeroContent from './VPHeroContent.vue'
import VPDocContent from './VPDocContent.vue'
import VPFooter from './VPFooter.vue'

const { frontmatter } = useData()
const route = useRoute()
const isHeroPost = computed(() => frontmatter.value.page === true)
const { hasSidebar } = useSidebar()
</script>

<style scoped>
.page-content {
  flex: 1;
  margin-top: var(--vp-layout-top-height, 0);
  min-height: calc(100vh - var(--vp-layout-top-height, 0px));
  padding: 0;
  transition: padding-left 0.2s ease;
}

.page-content.has-sidebar {
  padding-left: var(--vp-sidebar-width);
}

@media (width <= 959px) {
  .page-content.has-sidebar {
    padding-left: 0;
  }
}
</style>
