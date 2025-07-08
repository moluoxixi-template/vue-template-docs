<template>
  <ElDialog
    v-model="dialogVisible"
    :title="title"
    destroy-on-close
    style="width: 400px"
    @closed="closeDialog"
  >
    <ElForm
      ref="formRef"
      :model="formData"
      :rules="mergedRules"
      label-suffix="："
      label-width="80px"
    >
      <!-- 前置插槽 -->
      <slot name="before" />

      <!-- 执行时间 -->
      <ElFormItem v-if="props.isDisplayDate" :label="props.timeOptions.label" prop="time">
        <DateRangePicker
          v-model="formData.time"
          default-today
          format="YYYY-MM-DD HH:mm:ss"
          style="width: 100%"
          type="datetime"
          v-bind="props.timeOptions"
        />
      </ElFormItem>

      <!-- 账号 -->
      <ElFormItem label="账号" prop="usercode">
        <ElInput
          v-model="formData.usercode"
          :disabled="isEdit"
          autocomplete="username"
          @blur="debounceHandle"
          @keyup.enter="debounceHandle"
        />
      </ElFormItem>

      <!-- 姓名 -->
      <ElFormItem v-if="showName" label="姓名" prop="username">
        <ElInput v-model="formData.username" disabled />
      </ElFormItem>

      <!-- 中间插槽 -->
      <slot />

      <!-- 密码 -->
      <ElFormItem label="密码" prop="password">
        <ElInput
          v-model="formData.password"
          autocomplete="new-password"
          show-password
          type="password"
        />
      </ElFormItem>

      <!-- 后置插槽 -->
      <slot name="after" />
    </ElForm>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="closeDialog">取 消</ElButton>
        <ElButton type="primary" @click="verifyHandler">确 定</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script setup>
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'
import { debounce } from 'radash'
import { computed, reactive, watch } from 'vue'
import DateRangePicker from '@/components/DateRangePicker/index.ts'

defineOptions({
  name: 'PasswordVerify',
})
const props = defineProps({
  title: {
    type: String,
    default: '密码校验',
  },
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  showName: {
    type: Boolean,
    default: () => true,
  },
  needTime: {
    type: Boolean,
    default: () => true,
  },
  successMessage: {
    type: String,
    default: '密码校验通过',
  },
  timeOptions: {
    type: Object,
    default: () => ({
      label: '执行时间',
    }),
  },
  isDisplayDate: {
    type: Boolean,
    default: () => true,
  },
})

const emit = defineEmits(['verified', 'close'])
// 表单引用
const formRef = useTemplateRef('formRef')

async function baseHandle() {

}

const debounceHandle = debounce(500, baseHandle)

// 合并的表单数据
const formData = reactive({
  id: '',
  usercode: '',
  username: '',
  password: '',
  time: [],
})
// 使用 defineModel 替代手动实现 v-model
const dialogVisible = defineModel('modelValue')

// 监听外部传入的表单数据
watch(
  () => props.form,
  (newForm) => {
    // 将外部表单数据合并到内部表单
    Object.keys(newForm).forEach((key) => {
      if (key !== 'usercode' && key !== 'password') {
        formData[key] = newForm[key]
      }
    })
  },
  {
    immediate: true,
    deep: true,
  },
)

// 默认验证规则
const defaultRules = computed(() => {
  return {
    time: [{ required: true, message: `请选择${props.timeOptions.label}`, trigger: 'change' }],
    username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    usercode: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  }
})

// 合并默认规则和传入的规则
const mergedRules = computed(() => {
  const rules = { ...defaultRules.value }

  // 合并自定义规则
  Object.keys(props.rules).forEach((key) => {
    if (rules[key]) {
      // 如果已存在默认规则，则合并
      rules[key] = [...rules[key], ...props.rules[key]]
    }
    else {
      // 如果不存在默认规则，则直接使用自定义规则
      rules[key] = props.rules[key]
    }
  })

  return rules
})
watch(
  () => dialogVisible.value,
  (newVal) => {
    if (newVal) {
      // TODO: 初始化表单数据
      formData.name = '测试'
      formData.id = '1'
      formData.deptId = '1'
      formData.deptname = '测试部门'
      formData.time = []
    }
  },
)
// 关闭弹窗
function closeDialog() {
  dialogVisible.value = false
  emit('close')
  // 重置表单
  if (formRef.value) {
    formRef.value.resetFields()
  }
  else {
    formData.password = ''
  }
}

// 确认按钮处理
async function verifyHandler() {
  if (!formRef.value)
    return

  formRef.value.validate(async (valid) => {
    if (valid) {
      // 验证通过，触发verified事件
      const formDataObj = new FormData()
      formDataObj.append('usercode', formData.usercode)
      formDataObj.append('password', formData.password)
      // TODO: 需要换成真实接口
      const res = {
        statusCode: 200,
      }
      if (res.statusCode == 200) {
        ElMessage.success(props.successMessage)
        emit('verified', {
          ...formData,
          time: formData.time[0],
        })
        closeDialog()
      }
      else {
        ElMessage.error(res.message)
      }
    }
    else {
      // 验证失败
      ElMessage.warning('请完善表单信息')
      return false
    }
  })
}
</script>

<style scoped>
/* 可以添加组件特定的样式 */
</style>
