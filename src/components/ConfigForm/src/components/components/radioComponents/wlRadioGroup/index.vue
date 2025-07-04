<script setup lang="ts">
import type { configType, FormModelProps } from '@/components/ConfigForm/src/types'
import { computed, ref, watch } from 'vue'
import { isType } from '@/components/ConfigForm/src/utils'

interface RadioItem {
  label: string
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    prop?: string
    slots?: Record<string, any>
    model?: FormModelProps
    config?: configType
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
const radios = ref<RadioItem[]>([])
const buttons = ref<RadioItem[]>([])

const computedModel = computed({
  get: () => props.model[props.prop],
  set: (val) => {
    emit('update:model', val)
  },
})

watch(
  () => props.config,
  (v) => {
    const { show: showVal, event, radios: radiosVal = [], buttons: buttonsVal = [], ...rest } = v
    if (isType(showVal, 'boolean')) {
      show.value = !!showVal
    }
    radios.value = radiosVal
    buttons.value = buttonsVal
    Options.value = rest
    Event.value = event || {}
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <el-radio-group v-if="show" v-model="computedModel" v-bind="Options" v-on="Event">
    <el-radio v-for="radio in radios" :key="radio.label" v-bind="radio" />
    <el-radio-button v-for="button in buttons" :key="button.label" v-bind="button" />
  </el-radio-group>
</template>

<style scoped lang="scss"></style>
