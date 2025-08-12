<template>
  <div>
    测试sentry报错，点我111
    <AButton @click="throwError">
      测试按钮
    </AButton>
  </div>
</template>

<script lang="ts">
import AButton from '@moluoxixivue2/vue2components/Button'

export default {
  name: '示例sentry报错收集',
  components: {
    AButton,
  },
  methods: {
    throwError() {
      throw new Error('测试sentry报错，点我')
    },
  },
}
</script>

<style scoped lang="scss"></style>
