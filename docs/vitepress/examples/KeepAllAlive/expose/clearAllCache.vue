<template>
  <KeepAllAlive ref="aliveRef" />
  <div class="ops">
    <button class="btn" @click="go('/page/c')">
      进入C
    </button>
    <button class="btn" @click="go('/page/d')">
      进入D
    </button>
    <button class="btn warn" @click="clearAll()">
      清空全部缓存
    </button>
  </div>
  <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RouterView, useRouter } from 'vue-router'

const aliveRef = ref<any>()
const router = useRouter()

function go(path: string) {
  router.push({ path, query: { keepAlive: 'true' } })
}

function clearAll() {
  aliveRef.value?.clearAllCache?.()
}
</script>

<style scoped>
.ops {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.btn {
  padding: 4px 8px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.btn.warn {
  color: #f56c6c;
  border-color: #f56c6c;
}
.btn:hover {
  background: #f5f7fa;
}
</style>
