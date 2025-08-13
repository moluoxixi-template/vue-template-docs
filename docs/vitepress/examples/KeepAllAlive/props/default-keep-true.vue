<template>
  <KeepAllAlive :default-keep-alive="() => true" />
  <div class="links">
    <RouterLink to="/demo/p1">
      P1
    </RouterLink>
    <RouterLink to="/demo/p2">
      P2
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
