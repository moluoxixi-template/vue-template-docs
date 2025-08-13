<template>
  <KeepAllAlive />
  <div class="links">
    <RouterLink :to="{ path: '/detail', query: { id: 1, keepAlive: 'true' } }">
      详情 1
    </RouterLink>
    <RouterLink :to="{ path: '/detail', query: { id: 2, keepAlive: 'true' } }">
      详情 2
    </RouterLink>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.links {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
a {
  color: #409eff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
