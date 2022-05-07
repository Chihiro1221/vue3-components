<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { FormContext } from '@/components/form/types'

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'change'
    },
    {
      max: 6,
      message: '用户名不超过6位',
      trigger: 'change'
    }
  ],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'change'
  }, {
    min: 6,
    message: '密码不小于6位',
    trigger: 'change'
  }]
})
const form = reactive({
  username: '',
  password: ''
})
const FormRef = ref<FormContext>()
const submit = () => {
  FormRef.value?.validate?.(valid => {
    console.log('validate', valid)
  })
}
</script>

<template>
  <div class='form-item-demo'>
    <Form ref='FormRef' :rules='rules' :model='form'>
      <FormItem label='用户名' prop='username'>
        <HdInput v-model='form.username' placeholder='请输入用户名' />
      </FormItem>
      <FormItem label='密码' prop='password'>
        <HdInput v-model='form.password' type='password' placeholder='请输入密码' />
      </FormItem>
      <FormItem>
        <button @click='submit' type='button'>提交</button>
      </FormItem>
    </Form>
  </div>
</template>

<style scoped lang='scss'>

</style>
