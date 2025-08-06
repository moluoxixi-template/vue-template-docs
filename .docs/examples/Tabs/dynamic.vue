<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">动态增减标签页</h3>
      <div class="mb-2 text-sm text-gray-600">
        可以动态增加和关闭标签页
      </div>
      <Tabs
        v-model="activeTab"
        type="card"
        editable
        @tab-add="handleTabAdd"
        @tab-remove="handleTabRemove"
        @edit="handleEdit"
      >
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        >
          <div class="p-4">
            <h4 class="text-lg font-medium mb-2">{{ tab.label }}</h4>
            <div class="space-y-2">
              <p class="text-gray-600">{{ tab.content }}</p>
              <div class="text-sm text-gray-500">
                创建时间: {{ tab.createTime }}
              </div>
            </div>

            <!-- 模拟一些内容 -->
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div class="p-3 bg-blue-50 rounded">
                <div class="text-sm font-medium text-blue-700">数据统计</div>
                <div class="text-xs text-blue-600 mt-1">
                  访问量: {{ Math.floor(Math.random() * 1000) + 100 }}
                </div>
              </div>
              <div class="p-3 bg-green-50 rounded">
                <div class="text-sm font-medium text-green-700">状态</div>
                <div class="text-xs text-green-600 mt-1">
                  <el-tag size="small" type="success">正常运行</el-tag>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </Tabs>

      <div v-if="actionLog" class="mt-2 p-2 bg-blue-100 rounded text-sm text-blue-600">
        {{ actionLog }}
      </div>

      <div class="mt-4 text-sm text-gray-500">
        提示: 点击标签页右侧的 + 号可以添加新标签页，点击标签页上的 × 可以关闭标签页
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')
const actionLog = ref('')
let tabIndex = 2

const tabs = ref([
  {
    name: 'tab1',
    label: '首页',
    content: '这是首页标签页的内容',
    createTime: new Date().toLocaleString()
  }
])

const handleTabAdd = () => {
  const newTabName = `tab${tabIndex++}`
  const newTab = {
    name: newTabName,
    label: `新标签页${tabIndex - 1}`,
    content: `这是新创建的标签页${tabIndex - 1}的内容`,
    createTime: new Date().toLocaleString()
  }

  tabs.value.push(newTab)
  activeTab.value = newTabName

  actionLog.value = `添加了新标签页: ${newTab.label}`
  setTimeout(() => {
    actionLog.value = ''
  }, 3000)
}

const handleTabRemove = (targetName) => {
  const index = tabs.value.findIndex(tab => tab.name === targetName)
  if (index > -1) {
    const removedTab = tabs.value[index]
    tabs.value.splice(index, 1)

    actionLog.value = `关闭了标签页: ${removedTab.label}`
    setTimeout(() => {
      actionLog.value = ''
    }, 3000)

    // 如果关闭的是当前激活的标签页,切换到其他标签页
    if (activeTab.value === targetName && tabs.value.length > 0) {
      activeTab.value = tabs.value[Math.max(0, index - 1)].name
    }
  }
}

const handleEdit = (targetName, action) => {
  if (action === 'add') {
    handleTabAdd()
  } else if (action === 'remove') {
    handleTabRemove(targetName)
  }
}
</script>
