<template>
  <ElPopover
    :visible="popoverVisible"
    virtual-triggering
    :virtual-ref="props.virtualRef"
    :width="props.width"
    :placement="props.placement"
    :persistent="props.persistent"
    :teleported="props.teleported"
    :tabindex="props.tabindex"
    :auto-close="props.autoClose"
    :hide-after="props.hideAfter"
    :show-after="props.showAfter"
    :popper-style="props.popperStyle"
    :popper-class="props.popperClass"
    :popper-options="props.popperOptions"
    :show-arrow="props.showArrow"
    :transition="props.transition"
    :offset="props.offset"
    :disabled="props.disabled"
    :content="props.content"
    :effect="props.effect"
    :title="props.title"
    :trigger="props.trigger"
  >
    <div ref="popoverRef">
      <slot name="default" />
      <DraggableTable
        :id="props.id"
        v-bind="$attrs"
        ref="gridRef"
        :columns="columns"
        :model-value="data"
        :height="height"
        @cell-click="handleCellClick"
      >
        <!-- 使用插槽方式渲染自定义内容 -->
        <template v-for="name in slotNames" #[name]="slotParams" :key="name">
          <slot :name="name" v-bind="slotParams" />
        </template>
      </DraggableTable>
    </div>
  </ElPopover>
</template>

<script lang="ts" setup>
import type { InputInstance } from 'element-plus'
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import type { VxeTablePropTypes } from 'vxe-table'
import type { ColumnType, TableRowData } from '@/components/DraggableTable/src/_types'
import { ElPopover } from 'element-plus'
import DraggableTable from '@/components/DraggableTable'

defineOptions({
  name: 'PopoverTableSelect',
})
const props = defineProps({
  //#region 透传给popover
  virtualRef: {
    type: Object as () =>
      | ComponentPublicInstance
      | ComponentInternalInstance
      | InputInstance
      | HTMLElement
      | null,
    required: true,
  },
  placement: {
    type: String,
    default: 'bottom',
  }, /**
      * 触发方式，支持多种交互类型
      * @values 'click', 'focus', 'hover', 'contextmenu'
      * @default 'hover'
      */
  trigger: {
    type: String as PropType<'click' | 'focus' | 'hover' | 'contextmenu'>,
    default: 'hover',
    validator: (value: string) =>
      ['click', 'focus', 'hover', 'contextmenu'].includes(value),
  }, /**
      * 标题文本内容
      */
  title: {
    type: String,
    default: '',
  }, /**
      * Tooltip 主题样式
      * @values 'dark' / 'light'
      * @default 'light'
      */
  effect: {
    type: String as PropType<Effect>,
    default: 'light',
  },

  /**
   * 显示的主内容（可通过 slot 覆盖）
   */
  content: {
    type: String,
    default: '',
  },

  /**
   * 是否禁用 Popover
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 浮层相对于触发元素的偏移量（单位：像素）
   * @default 12
   */
  offset: {
    type: Number,
    default: 12,
  },

  /**
   * 浮层显示动画效果
   * @default 'el-fade-in-linear'
   */
  transition: {
    type: String,
    default: 'el-fade-in-linear',
  },

  /**
   * 是否显示箭头指示器
   * @default true
   */
  showArrow: {
    type: Boolean,
    default: true,
  },

  /**
   * Popper.js 的配置对象（高级定制）
   * @see https://popper.js.org/docs/v2/
   * @default { modifiers: [{ name: 'computeStyles', options: { gpuAcceleration: false } }] }
   */
  popperOptions: {
    type: Object as PropType<PopperOptions>,
    default: () => ({
      modifiers: [{
        name: 'computeStyles',
        options: { gpuAcceleration: false },
      }],
    }),
  },

  /**
   * 自定义浮层容器的 class 名称
   */
  popperClass: {
    type: String,
    default: '',
  },

  /**
   * 自定义浮层容器的行内样式
   */
  popperStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: '',
  },

  /**
   * 触发后延迟显示的时间（毫秒）
   * @default 0
   */
  showAfter: {
    type: Number,
    default: 0,
  },

  /**
   * 关闭浮层的延迟时间（毫秒）
   * @default 200
   */
  hideAfter: {
    type: Number,
    default: 200,
  },

  /**
   * 自动关闭延时（毫秒）
   * @default 0
   */
  autoClose: {
    type: Number,
    default: 0,
  },

  /**
   * Popover 的 tabindex 属性
   */
  tabindex: {
    type: Number,
    default: undefined,
  },

  /**
   * 是否将浮层插入至 body 元素（解决定位被遮挡问题）
   * @default true
   */
  teleported: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否持久化保留 Popover DOM（false 时长时间不触发会被销毁）
   * @default true
   */
  persistent: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: 400,
  },
  height: {
    type: [String, Number],
    default: 300,
  },
  //#endregion
  //#region 透传给DraggableTable
  id: {
    type: String,
    default: '',
  },
  columns: {
    type: Array as () => ColumnType[],
    default: () => [],
  },
  data: {
    type: Array as () => VxeTablePropTypes.Data,
    default: () => [],
  },
  //#endregion
})
const emit = defineEmits<{
  select: [row: TableRowData]
}>()
interface PopperOptions {
  modifiers?: Array<{
    name: string
    options?: Record<string, any>
  }>
}
// 获取插槽
const slots = useSlots()
const slotNames = computed(() => Object.keys(slots))
const popoverVisible = defineModel({
  type: Boolean,
  default: false,
})
const gridRef = useTemplateRef('gridRef')
const currentRowIndex = ref(0)

// 默认选中第一行
watch(
  () => props.data,
  (val) => {
    if (val && val.length > 0) {
      currentRowIndex.value = 0
      nextTick(() => {
        selectRow(0)
      })
    }
  },
  { immediate: true },
)

let virtualElement: HTMLElement | null = null

const popoverRef = useTemplateRef('popoverRef')
// 监听virtualRef的变化
watch(
  () => props.virtualRef,
  () => {
    // 移除旧元素的事件监听
    cleanupEventListeners()

    // 添加新元素的事件监听
    setupEventListeners()
  },
  { immediate: true },
)

// 监听popoverVisible的变化
watch(
  () => popoverVisible.value,
  (visible) => {
    if (visible) {
      if (props.data.length > 0) {
        // 当popover显示时，确保选中第一行
        nextTick(() => {
          selectRow(currentRowIndex.value)
        })
      }
      // 添加点击外部关闭的事件监听
      nextTick(() => {
        document.addEventListener('mousedown', handleOutsideClick)
      })
    }
    else {
      // 移除点击外部关闭的事件监听
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  },
)

/**
 * 设置事件监听器
 */
function setupEventListeners() {
  virtualElement = (props.virtualRef as ComponentPublicInstance)?.$el || props.virtualRef
  if (virtualElement) {
    virtualElement.addEventListener('keydown', handleKeydown)
    virtualElement.addEventListener('focus', handleFocus)
    virtualElement.addEventListener('click', handleClick)
  }
}

/**
 * 清理事件监听器
 */
function cleanupEventListeners() {
  if (virtualElement) {
    virtualElement.removeEventListener('keydown', handleKeydown)
    virtualElement.removeEventListener('focus', handleFocus)
    virtualElement.removeEventListener('click', handleClick)
    virtualElement = null
  }
  // 确保移除document上的事件监听
  document.removeEventListener('mousedown', handleOutsideClick)
}

/**
 * 处理点击外部区域，关闭popover
 */
function handleOutsideClick(e: MouseEvent) {
  if (!popoverVisible.value)
    return

  // 获取popover元素
  const popoverEl = popoverRef.value
  // 获取virtualRef元素
  const virtualEl = (props.virtualRef as ComponentPublicInstance)?.$el || props.virtualRef
  // 检查点击是否在popover或virtualRef元素外部
  if (
    popoverEl
    && !popoverEl.contains(e.target as Node)
    && virtualEl
    && !virtualEl.contains(e.target as Node)
  ) {
    popoverVisible.value = false
    ;(props.virtualRef as HTMLElement)?.blur?.()
    ;(props.virtualRef as ComponentPublicInstance)?.$el?.blur?.()
  }
}

// 组件卸载时清理
onUnmounted(() => {
  cleanupEventListeners()
})

/**
 * 处理focus事件
 */
function handleFocus() {
  // 避免重复触发
  if (popoverVisible.value)
    return
  popoverVisible.value = true
}

/**
 * 处理click事件，即使元素已聚焦也能打开popover
 */
function handleClick() {
  popoverVisible.value = true
}

/**
 * 选中指定索引的行
 * @param index 行索引
 */
function selectRow(index: number) {
  if (!props.data.length)
    return
  currentRowIndex.value = index
  const row = props.data[index]
  gridRef.value?.getTable()?.setCurrentRow(row)
  gridRef.value?.getTable()?.scrollToRow(row)
}

/**
 * 处理键盘按键事件
 * 上下键切换选中行，回车确认选择
 */
function handleKeydown(e: KeyboardEvent) {
  if (!popoverVisible.value)
    return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (currentRowIndex.value < props.data.length - 1) {
      selectRow(currentRowIndex.value + 1)
    }
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (currentRowIndex.value > 0) {
      selectRow(currentRowIndex.value - 1)
    }
  }
  else if (e.key === 'Enter') {
    e.preventDefault()
    if (props.data.length > 0) {
      const selectedRow = props.data[currentRowIndex.value]
      // 先关闭popover，再触发事件
      popoverVisible.value = false
      nextTick(() => {
        emit('select', selectedRow)
      })
    }
  }
  else if (e.key === 'Escape') {
    e.preventDefault()
    popoverVisible.value = false
  }
}

/**
 * 处理单元格点击事件
 */
function handleCellClick({ row, rowIndex }: { row: TableRowData, rowIndex: number }) {
  currentRowIndex.value = rowIndex

  const selectedRow = row
  popoverVisible.value = false

  // 使用nextTick延迟emit，确保popover关闭后再触发事件
  nextTick(() => {
    emit('select', selectedRow)
  })
}
defineExpose({})
</script>

<style scoped></style>
