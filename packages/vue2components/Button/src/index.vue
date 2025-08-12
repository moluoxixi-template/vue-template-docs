<template>
  <el-button :type="type" :size="size" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: function(value) {
        return ['primary', 'success', 'warning', 'danger', 'info', 'default'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['large', 'medium', 'small', 'mini'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick: function(event) {
      console.log('组件里按钮的点击事件触发')
      // 触发点击事件
      this.$emit('click', event)
    }
  }
}
</script>
<style scoped>
/* 空的样式块，确保CSS注入插件能正常工作 */

/* 可以添加自定义样式这里 */
</style>
