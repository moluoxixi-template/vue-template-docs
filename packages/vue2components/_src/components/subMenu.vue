<template>
  <el-menu-item v-if="!route.children?.length" :key="index" :index="route.path">
    {{ route.meta?.title || route.name }}
  </el-menu-item>
  <el-submenu v-else :key="index" :popper-append-to-body="false" :index="route.path">
    <template #title>
      {{ route.meta?.title || route.name }}
    </template>
    <SubMenu v-for="(item, index) in route.children" :key="index" :route="item" />
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SubMenu',
  // 在Vue 2中需要明确声明自己作为组件
  components: {
    SubMenu: () => import('./subMenu.vue'),
  },
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss"></style>
