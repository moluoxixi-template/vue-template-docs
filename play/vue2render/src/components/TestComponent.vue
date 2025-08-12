<template>
  <div>
    <h1>测试组件</h1>
    <p>{{ message }}</p>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      message: 'Hello from Vue 2'
    }
  },
  methods: {
    updateMessage() {
      this.message = 'Message updated!'
    }
  }
})
</script>
