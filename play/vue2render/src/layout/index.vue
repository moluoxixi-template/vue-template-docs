<template>
  <div class="h-full" :style="`--el-color-primary: ${themeColor || '#3A77FF'};`">
    <el-container class="w-full h-full">
      <el-header class="headerbox" style="padding: 0" height="30">
        <div class="w-full h-full bg-primary flex justify-center">
          <el-menu :default-active="defaultTab" :ellipsis="false" mode="horizontal" router>
            <!-- <subMenu :routes="routes" /> -->
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <el-container class="h-full w-full">
          <el-main style="background-color: #fff">
            <transition name="fade">
              <router-view v-slot="{ Component, route }">
                <keep-alive v-if="route.meta.keep">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
                <component v-else :is="Component" :key="route.path" />
              </router-view>
            </transition>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
// import subMenu from '@moluoxixi/components/subMenu.vue'

export default Vue.extend({
  name: 'Layout',
  // components: {
  //   subMenu
  // },
  computed: {
    ...mapGetters('system', ['themeColor', 'systemCode']),
    routes() {
      return this.$router.options.routes[0].children || [];
    },
    defaultTab() {
      return this.$route.path;
    }
  },
  data() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.headerbox {
  ::v-deep .el-menu {
    background-color: var(--el-color-primary);

    .el-menu-item,
    .el-submenu {
      background-color: var(--el-color-primary);
      color: #fff !important;

      .el-submenu__title {
        background-color: var(--el-color-primary);
        color: #fff !important;
      }

      &.is-active,
      &:hover {
        background-color: #fff;
        color: var(--el-color-primary) !important;

        .el-submenu__title,
        .el-submenu__title:hover {
          background-color: #fff;
          color: var(--el-color-primary) !important;
        }
      }
    }

    &.el-menu--popup {
      background-color: #fff;

      .el-submenu,
      .el-menu-item {
        background-color: #fff !important;
        color: var(--el-color-primary) !important;

        .el-submenu__title {
          background-color: #fff;
          color: var(--el-color-primary) !important;
        }

        &.is-active,
        &:hover {
          background-color: var(--el-color-primary) !important;
          color: #fff !important;

          .el-submenu__title,
          .el-submenu__title:hover {
            background-color: var(--el-color-primary) !important;
            color: #fff !important;
          }
        }
      }
    }
  }

  ::v-deep .el-main {
    --el-main-padding: 12px;
  }
}
</style>
