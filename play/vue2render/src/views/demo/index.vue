<template>
  <div class="demo-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>示例页面</span>
        </div>
      </template>
      <div>
        <p>这是一个示例页面</p>
        <MButton @click="handleClick">调试的按钮</MButton>
        <WButton type="primary" @click="handleClick">组件库的按钮</WButton>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '@moluoxixivue2/vue2components/Button';
import AButton from '../../../../../moluoxixivue2/packages/Button/es/index.mjs'

export default Vue.extend({
  name: 'DemoPage',
  components: {
    MButton: Button,
    WButton: AButton
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$message.success('按钮被点击了');
    }
  }
});
</script>

<style scoped>
.demo-page {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
