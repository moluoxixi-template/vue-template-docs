<template>
  <KeepAllAlive :default-keep-alive="keep" />
  <div class="links">
    <RouterLink to="/cache/me">
      缓存页
    </RouterLink>
    <RouterLink to="/nocache/him">
      非缓存页
    </RouterLink>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

function keep(route: any) {
  return String(route.fullPath).startsWith('/cache')
}
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
