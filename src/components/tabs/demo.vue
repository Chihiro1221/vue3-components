<script setup lang='ts'>
import Tabs from '@/components/tabs/tabs'
import { ref } from 'vue'

const currentTab = ref('1')
const handleClick = (pane: { label: string, name: string }) => {
  console.log(pane)
}
</script>

<template>
  <Tabs v-model='currentTab' @tab-click='handleClick'>
    <Tab-pane label='首页' name='1'>
      content 1
    </Tab-pane>
    <Tab-pane label='分类' name='2'>content 2</Tab-pane>
    <Tab-pane label='咨询' name='3'>content 3</Tab-pane>
  </Tabs>
</template>

<style scoped lang='scss'>

</style>
