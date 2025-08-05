# ConfigForm

配置化表单组件，通过配置快速生成表单，支持各种表单控件和校验规则。

## 基础用法

```vue
<template>
  <div>
    <ConfigForm
      ref="formRef"
      :config="formConfig"
      :model="formData"
      :rules="formRules"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ConfigForm } from '@moluoxixi/components'

const formRef = ref()
const formData = ref({
  name: '',
  age: null,
  email: '',
  address: ''
})

const formConfig = ref([
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    type: 'number',
    prop: 'age',
    label: '年龄',
    placeholder: '请输入年龄'
  },
  {
    type: 'input',
    prop: 'email',
    label: '邮箱',
    placeholder: '请输入邮箱'
  },
  {
    type: 'textarea',
    prop: 'address',
    label: '地址',
    placeholder: '请输入地址'
  }
])

const formRules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
})

const handleSubmit = (formData: any) => {
  console.log('提交的表单数据:', formData)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 表单配置 | Array | [] |
| model | 表单数据对象 | Object | {} |
| rules | 表单校验规则 | Object | {} |
| labelWidth | 标签宽度 | String | '100px' |
| disabled | 是否禁用表单 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 表单提交时触发 | formData |
| reset | 表单重置时触发 | - |
| change | 表单项值改变时触发 | prop, value |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义表单项内容 |
| footer | 表单底部内容 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| validate | 对整个表单进行校验 | Function |
| validateField | 对部分表单字段进行校验 | Function |
| resetFields | 对整个表单进行重置 | Function |
| clearValidate | 移除表单项的校验结果 | Function |

## 源码

查看组件源码：[ConfigForm](https://github.com/componentProject/vue-component/tree/main/packages/components/ConfigForm)