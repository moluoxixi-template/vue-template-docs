<script setup lang="ts">
import type { configType, FormModelProps } from '@/components/ConfigForm/src/types'
import { ref, watch } from 'vue'
import { isType } from '@/components/ConfigForm/src/utils'

const props = withDefaults(
  defineProps<{
    prop: string
    slots: Record<string, any>
    model: FormModelProps
    config: configType
  }>(),
  {
    prop: '',
    slots: () => ({}),
    model: () => ({}),
    config: () => ({}),
  },
)

const emit = defineEmits(['update:model'])

const show = ref(true)
const Event = ref({})
const Options = ref({})

watch(
  () => props.config,
  (v) => {
    const { show: showVal, event, ...rest } = v
    if (isType(showVal, 'boolean')) {
      show.value = !!showVal
    }
    Options.value = rest
    Event.value = event || {}
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <el-image v-if="show" v-bind="Options" v-on="Event">
    <template v-if="slots.placeholder" #placeholder>
      <slot name="placeholder" />
    </template>
    <template v-if="slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="slots.viewer" #viewer>
      <slot name="viewer" />
    </template>
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </el-image>
</template>

<style scoped lang="scss"></style>
