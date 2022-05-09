<script lang='ts'>
export default {
  name: 'InputDemo'
}
</script>

<script setup lang='ts'>
import { ref } from 'vue'
import HdInput from '@/components/input/input'

const content = ref('')
</script>

<template>
  <div class='input-demo'>
    {{ content }}
    <HdInput placeholder='请输入姓名' v-model='content' type='password' />
  </div>
</template>

<style scoped lang='scss'>
.input-demo {
  width: 1200px;
  margin: 0 auto;
}
</style>
