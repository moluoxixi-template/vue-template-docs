<template>
  <div class="example-container">
    <h3>水平分割（默认）</h3>
    <div class="demo-splitter">
      <Splitter>
        <template #left>
          <div class="demo-panel left-panel">
            左侧面板
          </div>
        </template>
        <template #right>
          <div class="demo-panel right-panel">
            右侧面板
          </div>
        </template>
      </Splitter>
    </div>

    <h3>垂直分割</h3>
    <div class="demo-splitter vertical-splitter">
      <Splitter layout="vertical">
        <template #top>
          <div class="demo-panel top-panel">
            顶部面板
          </div>
        </template>
        <template #bottom>
          <div class="demo-panel bottom-panel">
            底部面板
          </div>
        </template>
      </Splitter>
    </div>
    <h3>三面板分割</h3>
    <div class="demo-splitter">
      <Splitter>
        <template #panel1>
          <div class="demo-panel panel1">
            面板 1
          </div>
        </template>
        <template #panel2>
          <div class="demo-panel panel2">
            面板 2
          </div>
        </template>
        <template #panel3>
          <div class="demo-panel panel3">
            面板 3
          </div>
        </template>
      </Splitter>
    </div>
  </div>
</template>

<script setup lang="ts">
import Splitter from './index.vue'
</script>

<style scoped>
.example-container {
  padding: 20px;
}

.demo-splitter {
  height: 300px;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
}

.vertical-splitter {
  height: 400px;
}

.demo-panel {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 20px;
}

.left-panel {
  background-color: #f0f9eb;
}

.right-panel {
  background-color: #f2f6fc;
}

.top-panel {
  background-color: #f0f9eb;
}

.bottom-panel {
  background-color: #f2f6fc;
}

.panel1 {
  background-color: #f0f9eb;
}

.panel2 {
  background-color: #f2f6fc;
}

.panel3 {
  background-color: #ecf5ff;
}
</style>
