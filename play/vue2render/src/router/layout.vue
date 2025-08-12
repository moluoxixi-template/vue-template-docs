<template>
  <component :is="layout" />
</template>

<script lang="ts">
import Vue from 'vue';
import layouts from '@/layout/index';

export default Vue.extend({
  name: 'RouterLayout',
  computed: {
    layout() {
      // 直接使用默认布局，不再尝试从store获取
      return layouts['default'];
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
