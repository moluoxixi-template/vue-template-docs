<template>
  <div>
    <el-popover
      :visible="popoverVisible"
      virtual-triggering
      :virtual-ref="props.virtualRef"
      trigger="contextmenu"
      placement="bottom"
      width="200"
    >
      <div class="flex flex-col" ref="popoverRef">
        <div class="flex flex-col">
          <el-checkbox
            v-for="col in allColumns"
            :label="col.field"
            v-model="col.visible"
            :key="col.field"
            >{{ col.title }}
          </el-checkbox>
        </div>
        <div class="flex justify-center">
          <el-button size="small" @click="popoverVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { PropType, ComponentPublicInstance } from 'vue'
import { ElPopover, ElCheckbox } from 'element-plus'
import { cloneDeep } from 'lodash'
import type { ColumnType, types } from '@/components/DraggableTable/_types'
import { getTypeName } from '@/components/DraggableTable/_utils'

const props = defineProps({
  virtualRef: {
    type: Object as PropType<ComponentPublicInstance | HTMLElement>,
  },
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
})
const emits = defineEmits(['menuConfirm'])
// 右键菜单弹窗控制
const popoverVisible = defineModel({
  type: Boolean,
  default: false,
})

const allColumns = ref<ColumnType[]>([])
watch(() => props.columns, initColumns, {
  immediate: true,
})

function initColumns() {
  allColumns.value = cloneDeep(props.columns).map((col) => {
    return {
      ...col,
      visible: col.visible ?? true,
      title: col.title || getTypeName(col.type as types),
    }
  })
}

function handleConfirm() {
  if (allColumns.value.filter((col) => !col.visible).length === 0) {
    return ElMessage.warning('至少保留一列')
  }
  emits('menuConfirm', allColumns.value)
  popoverVisible.value = false
}

const popoverRef = useTemplateRef('popoverRef')
let virtualElement: HTMLElement | null = null
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
      // 添加点击外部关闭的事件监听
      nextTick(() => {
        document.addEventListener('mousedown', handleOutsideClick)
      })
    } else {
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
    //   监听事件
  }
}

/**
 * 清理事件监听器
 */
function cleanupEventListeners() {
  if (virtualElement) {
    // 移除事件
    virtualElement = null
  }
  // 确保移除document上的事件监听
  document.removeEventListener('mousedown', handleOutsideClick)
}

/**
 * 处理点击外部区域，关闭popover
 */
function handleOutsideClick(e: MouseEvent) {
  if (!popoverVisible.value) return

  // 获取popover元素
  const popoverEl = popoverRef.value
  // 获取virtualRef元素
  const virtualEl = (props.virtualRef as ComponentPublicInstance)?.$el || props.virtualRef
  // 检查点击是否在popover或virtualRef元素外部
  if (
    popoverEl &&
    !popoverEl.contains(e.target as Node) &&
    virtualEl &&
    !virtualEl.contains(e.target as Node)
  ) {
    popoverVisible.value = false
    initColumns()
    ;(props.virtualRef as HTMLElement)?.blur?.()
    ;(props.virtualRef as ComponentPublicInstance)?.$el?.blur?.()
  }
}

// 组件卸载时清理
onUnmounted(() => {
  cleanupEventListeners()
})
</script>
