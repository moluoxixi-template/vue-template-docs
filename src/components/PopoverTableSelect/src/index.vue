<template>
  <div>
    <PopoverTableSelect v-model="popoverModel" :virtual-ref="computedVirtualRef" v-bind="$attrs">
      <template v-for="name in slotNames" #[name]="slotParams" :key="name">
        <slot :name="name" v-bind="slotParams" />
      </template>
    </PopoverTableSelect>
    <ElInput
      v-if="props.popType === 'input'"
      ref="inputRef"
      v-bind="props.inputProps"
      v-model="currentInputValue"
      :placeholder="computedPlaceholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="computedInput"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputInstance, InputProps } from 'element-plus'
import type { ComponentInternalInstance, ComponentPublicInstance, PropType } from 'vue'
import { ElInput } from 'element-plus'
import { debounce as _debounce, throttle as _throttle } from 'lodash'
import type { DebounceSettingsLeading, ThrottleSettingsLeading } from 'lodash'
import { computed, watch } from 'vue'
import PopoverTableSelect from '@/components/PopoverTableSelect/src/base/index.vue'
import type { slotsType } from '@/components/_types'

const props = defineProps({
  debounce: {
    type: Number,
    default: 0,
  },
  throttle: {
    type: Number,
    default: 300,
  },
  /**
   * 防抖节流的配置
   * @see https://github.com/pikax/vue-throttle-debounce#throttle
   * @see https://github.com/pikax/vue-throttle-debounce#debounce
   */
  options: {
    type: Object as PropType<DebounceSettingsLeading | ThrottleSettingsLeading>,
    default: () => ({}),
  },
  popType: {
    type: String as PropType<'default' | 'input'>,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '点击或按下方向键试试',
  },
  inputProps: {
    type: Object as PropType<InputProps>,
    default: () => ({}),
  },
  inputValue: {
    type: String,
    default: '',
  },
  virtualRef: {
    type: Object as () =>
      | ComponentPublicInstance
      | ComponentInternalInstance
      | InputInstance
      | HTMLElement
      | null,
    default: null,
    required: false,
  },
})
const emits = defineEmits(['focus', 'input', 'blur'])
// 获取插槽
const slots = defineSlots<slotsType>()
const slotNames = computed<string[]>(() => Object.keys(slots) as string[])

const popoverModel = defineModel({
  type: Boolean,
  default: false,
})
const currentInputValue = ref('')
const cacheInputValue = ref('')

watch(
  () => props.inputValue,
  (val) => {
    currentInputValue.value = val
    cacheInputValue.value = val
  },
)
const computedPlaceholder = computed(() => {
  return cacheInputValue.value || props.placeholder
})
const inputRef = useTemplateRef<HTMLElement>('inputRef')
const computedVirtualRef = computed<HTMLElement | ComponentPublicInstance
  | ComponentInternalInstance
  | InputInstance | null>(() => {
  return props.virtualRef || inputRef.value
})

function handleFocus() {
  cacheInputValue.value = currentInputValue.value
  currentInputValue.value = ''
  emits('focus')
  if (!popoverModel.value) {
    emits('input', currentInputValue.value)
  }
}

function handleBlur() {
  emits('blur')
  currentInputValue.value = cacheInputValue.value
  cacheInputValue.value = ''
}

function handleInput(val: string) {
  emits('input', val)
}

const computedInput = computed(() => {
  if (props.debounce) {
    return _debounce(handleInput, props.debounce, props.options)
  }
  else if (props.throttle) {
    return _throttle(handleInput, props.throttle, props.options)
  }
  else {
    return handleInput
  }
})
</script>

<style scoped lang="scss"></style>
