import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TabPane',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => (<div class='content'>{slots.default?.()}</div>)
  }
})