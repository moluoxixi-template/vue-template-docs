<template>
  <KeepAllAlive />
  <div class="links">
    <RouterLink :to="{ path: '/demo/a', query: { keepAlive: 'true' } }">
      A(缓存)
    </RouterLink>
    <RouterLink :to="{ path: '/demo/b', query: { keepAlive: 'false' } }">
      B(不缓存)
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
