<script lang='ts'>
export default {
  name: 'FormItemDemo'
}
</script>
<script setup lang='ts'>
import FormItem from '@/components/form-item/form-item'
import HdInput from '@/components/input'
import { reactive } from 'vue'

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
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'change'
  }
})
const form = reactive({
  username: '',
  password: ''
})
</script>

<template>
  <div class='form-item-demo'>
    <FormItem label='用户名' :rules='rules.username'>
      <HdInput v-model='form.username' placeholder='请输入用户名' />
    </FormItem>
    <FormItem label='密码' prop='password' :rules='rules.password'>
      <HdInput v-model='form.password' type='password' placeholder='请输入密码' />
    </FormItem>
  </div>
</template>

<style scoped lang='scss'>

</style>
