<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">可关闭标签页</h3>
      <div class="mb-2 text-sm text-gray-600">
        标签页支持关闭操作
      </div>
      <Tabs
        v-model="activeTab"
        type="card"
        closable
        @tab-remove="handleTabRemove"
      >
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        >
          <div class="p-4">
            <h4 class="text-lg font-medium mb-2">{{ tab.label }}</h4>
            <p class="text-gray-600">{{ tab.content }}</p>
          </div>
        </el-tab-pane>
      </Tabs>

      <div v-if="removeLog" class="mt-2 p-2 bg-red-100 rounded text-sm text-red-600">
        {{ removeLog }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')
const removeLog = ref('')

const tabs = ref([
  { name: 'tab1', label: '标签页1', content: '这是标签页1的内容，可以点击右侧的×关闭' },
  { name: 'tab2', label: '标签页2', content: '这是标签页2的内容，可以点击右侧的×关闭' },
  { name: 'tab3', label: '标签页3', content: '这是标签页3的内容，可以点击右侧的×关闭' },
  { name: 'tab4', label: '标签页4', content: '这是标签页4的内容，可以点击右侧的×关闭' }
])

const handleTabRemove = (targetName) => {
  const index = tabs.value.findIndex(tab => tab.name === targetName)
  if (index > -1) {
    const removedTab = tabs.value[index]
    tabs.value.splice(index, 1)

    removeLog.value = `已关闭 ${removedTab.label}`
    setTimeout(() => {
      removeLog.value = ''
    }, 3000)

    // 如果关闭的是当前激活的标签页,切换到其他标签页
    if (activeTab.value === targetName && tabs.value.length > 0) {
      activeTab.value = tabs.value[Math.max(0, index - 1)].name
    }
  }
}
</script>
