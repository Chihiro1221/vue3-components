import { defineComponent, PropType, provide } from 'vue'
import {
  FormContext,
  FormItemExtraProps,
  FormItemRules,
  ProviderKeyEnum,
  validateType
} from '@/components/form/types'

export default defineComponent({
  name: 'Form',
  props: {
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    rules: {
      type: Object as PropType<Record<string, FormItemRules | FormItemRules[]>>
    }
  },
  emits: ['submit'],
  setup(props, { slots, expose, emit }) {
    const items: FormItemExtraProps[] = []
    const getFormItemValidate = (payload: FormItemExtraProps) => {
      items.push(payload)
    }
    expose({
      validate(callback) {
        const states = items.filter(item => item.prop).map(async item => {
          return await item.validate(props.model[item.prop])
        })
        Promise.all(states).then(value => {
          callback && callback(value.every(item => item))
        })
      },
      getFormItemValidate
    } as { validate: validateType })
    provide<Partial<FormContext>>(ProviderKeyEnum.FORM_KEY, {
      model: props.model,
      rules: props.rules
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      emit('submit')
    }
    return () => (<form onSubmit={onSubmit}>{slots.default?.()}</form>)
  }
})