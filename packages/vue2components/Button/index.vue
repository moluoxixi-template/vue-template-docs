<template>
  <el-button v-bind="$attrs" @click="throttleClick">
    <template v-for="name in slotNames" #[name]="slotParams">
      <div :key="name">
        <slot :name="name" v-bind="slotParams || {}" />
      </div>
    </template>
  </el-button>
</template>

<script lang="ts">
import { throttle as _throttle } from 'lodash'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'AButton',
  props: {
    throttle: {
      type: Number,
      default: 1000,
    },
  },
  emits: ['click'],
  data() {
    return {
      throttleClick: () => {},
    }
  },
  computed: {
    slotNames() {
      return Object.keys(this.$slots)
    },
  },
  created() {
    this.throttleClick = _throttle(this.handleClick, this.throttle, { leading: true, trailing: false })
  },
  methods: {
    handleClick(params) {
      this.$emit('click', params)
    },
  },
})
</script>

<style scoped lang="scss"></style>
