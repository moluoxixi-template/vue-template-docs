<template>
  <div>
    测试sentry报错，点我111
  </div>
</template>

<script lang="ts">
export default {
  name: '示例sentry报错收集',
  components: {
  },
  methods: {
    throwError() {
      throw new Error('测试sentry报错，点我')
    },
  },
}
</script>

<style scoped lang="scss"></style>
