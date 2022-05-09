<template>
  <div class='demo-box'>
    <div class='form-item' style='width: 206px;'>
      value: {{ value }}
      <checkbox v-model='value' />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Checkbox from './checkbox'

export default defineComponent({
  name: 'CheckboxDemo',
  components: { Checkbox },
  setup(props, context) {
    const value = ref(false)
    return {
      value
    }
  }
})
</script>