<!--
 * @Author: moluoxixi 1983531544@qq.com
 * @Date: 2025-05-07 14:08:20
 * @LastEditors: moluoxixi 1983531544@qq.com
 * @LastEditTime: 2025-05-09 19:32:19
 * @FilePath: \vue-template\src\layout\element.vue
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div>
    <div
      class="h-full"
      :class="{ 'h-screen': !qiankunWindow.__POWERED_BY_QIANKUN__ }"
      :style="`--el-color-primary: ${themeColor || '#3A77FF'};`"
    >
      <el-container class="w-full h-full">
        <el-header
          v-if="!qiankunWindow.__POWERED_BY_QIANKUN__" class="headerbox" style="padding: 0"
          height="30"
        >
          <div class="w-full h-full bg-primary flex justify-center">
            <el-menu :default-active="defaultTab" :ellipsis="false" mode="horizontal" router>
              <SubMenu v-for="(route, index) in routes" :key="index" :route="route" />
            </el-menu>
          </div>
        </el-header>
        <el-main>
          <el-container class="h-full w-full">
            <el-main style="background-color: #fff">
              <transition name="fade">
                <router-view />
              </transition>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import zhCn from 'element-ui/lib/locale/lang/zh-CN'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { defineComponent } from '@vue/composition-api'
import SubMenu from '@/components/subMenu.vue'

export default defineComponent({
  name: 'ElementLayout',
  components: {
    SubMenu,
  },
  data() {
    return {
      zhCn,
      qiankunWindow,
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes[0].children || []
    },
    themeColor() {
      return this.$store.state.system.themeColor
    },
    systemCode() {
      return this.$store.state.system.systemCode
    },
    defaultTab() {
      return this.$route.path
    },
  },
})
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
    padding: 12px;
  }
}
</style>
