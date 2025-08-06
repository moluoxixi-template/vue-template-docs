<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">基础用法</h3>
      <div class="mb-2 text-sm text-gray-600">
        在输入框中按回车键会自动跳转到下一个输入框
      </div>
      <EnterNextContainer @noNextInput="handleNoNextInput">
        <div class="space-y-3">
          <el-input v-model="form.name" placeholder="请输入姓名" />
          <el-input v-model="form.phone" placeholder="请输入手机号" />
          <el-input v-model="form.email" placeholder="请输入邮箱" />
          <el-input v-model="form.address" placeholder="请输入地址" />
        </div>
      </EnterNextContainer>

      <div v-if="noNextMessage" class="mt-2 p-2 bg-blue-100 rounded text-sm text-blue-600">
        {{ noNextMessage }}
      </div>

      <div class="mt-4 p-3 bg-gray-50 rounded">
        <div class="text-sm font-medium text-gray-700 mb-2">表单数据：</div>
        <pre class="text-xs text-gray-600">{{ JSON.stringify(form, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: ''
})

const noNextMessage = ref('')

const handleNoNextInput = (element) => {
  noNextMessage.value = '已到达最后一个输入框，可以进行下一步操作'
  setTimeout(() => {
    noNextMessage.value = ''
  }, 3000)
}
</script>
