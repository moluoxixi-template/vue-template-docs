<template>
  <div class="sidebar-link">
    <a
      v-if="isLink"
      :href="item.link"
      :class="{ active: isActive }"
      @click="emit('close')"
    >
      {{ item.text }}
    </a>
    <div v-else class="sidebar-link-text">
      {{ item.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

interface SidebarItem {
  text: string
  link?: string
  children?: SidebarItem[]
}

const props = defineProps<{
  item: SidebarItem
}>()

const emit = defineEmits(['close'])

const route = useRoute()

const isActive = computed(() => {
  if (!props.item.link)
    return false
  return route.path === props.item.link
})

const isLink = computed(() => !!props.item.link)
</script>

<style scoped>
.sidebar-link {
  margin-bottom: 4px;
}

.sidebar-link a {
  display: block;
  padding: 8px 12px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;
  line-height: 1.4;
}

.sidebar-link a:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.sidebar-link a.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  font-weight: 500;
}

.sidebar-link-text {
  padding: 8px 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
}
</style>
