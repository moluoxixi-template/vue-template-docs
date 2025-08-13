<template>
  <KeepAllAlive />
  <div class="links">
    <RouterLink to="/demo/meta-on">
      meta.keepAlive=true
    </RouterLink>
    <RouterLink to="/demo/meta-off">
      meta.keepAlive=false
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
