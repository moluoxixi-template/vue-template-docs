<template>
  <EnterNextContainer @no-next-input="handleNoNextInput">
    <ElRow>
      <ElCol><ElInput v-model="form.name" placeholder="请输入姓名" /></ElCol>
      <ElCol><ElInput v-model="form.phone" placeholder="请输入手机号" /></ElCol>
      <ElCol><ElInput v-model="form.email" placeholder="请输入邮箱" /></ElCol>
      <ElCol><ElInput v-model="form.address" placeholder="请输入地址" /></ElCol>
    </ElRow>
  </EnterNextContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElCol, ElInput, ElRow } from 'element-plus'

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
})

const noNextMessage = ref('')

function handleNoNextInput() {
  noNextMessage.value = '已到达最后一个输入框，可以进行下一步操作'
  setTimeout(() => {
    noNextMessage.value = ''
  }, 3000)
}
</script>
