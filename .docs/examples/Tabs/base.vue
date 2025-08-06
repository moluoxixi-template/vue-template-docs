<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">基础用法</h3>
      <div class="mb-2 text-sm text-gray-600">
        基础的、简洁的标签页
      </div>
      <Tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="用户管理" name="user">
          <div class="p-4">
            <h4 class="text-lg font-medium mb-2">用户管理</h4>
            <p class="text-gray-600">这里是用户管理的内容区域</p>
            <div class="mt-4 space-y-2">
              <div class="flex items-center space-x-2">
                <span class="w-16 text-gray-500">姓名:</span>
                <span>张三</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-16 text-gray-500">角色:</span>
                <span>管理员</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-16 text-gray-500">状态:</span>
                <el-tag type="success">活跃</el-tag>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="配置管理" name="config">
          <div class="p-4">
            <h4 class="text-lg font-medium mb-2">配置管理</h4>
            <p class="text-gray-600">这里是配置管理的内容区域</p>
            <div class="mt-4 space-y-2">
              <div class="flex items-center space-x-2">
                <span class="w-20 text-gray-500">系统名称:</span>
                <span>管理系统</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-20 text-gray-500">版本:</span>
                <span>v1.0.0</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-20 text-gray-500">环境:</span>
                <el-tag type="warning">开发环境</el-tag>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="角色管理" name="role">
          <div class="p-4">
            <h4 class="text-lg font-medium mb-2">角色管理</h4>
            <p class="text-gray-600">这里是角色管理的内容区域</p>
            <div class="mt-4 space-y-2">
              <div class="flex items-center space-x-2">
                <span class="w-16 text-gray-500">角色:</span>
                <span>超级管理员</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-16 text-gray-500">权限:</span>
                <span>全部权限</span>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="任务调度" name="task">
          <div class="p-4">
            <h4 class="text-lg font-medium mb-2">任务调度</h4>
            <p class="text-gray-600">这里是任务调度的内容区域</p>
            <div class="mt-4">
              <el-tag type="info">定时任务</el-tag>
              <el-tag type="success" class="ml-2">正在运行</el-tag>
            </div>
          </div>
        </el-tab-pane>
      </Tabs>

      <div class="mt-4 text-sm text-gray-600">
        当前选中: {{ activeTab }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('user')

const handleTabClick = (pane, ev) => {
  console.log('点击标签页:', pane.props.name)
}
</script>
