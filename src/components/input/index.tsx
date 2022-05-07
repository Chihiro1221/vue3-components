import { defineComponent, inject } from 'vue'
import './index.scss'
import { FormItemContext, ProviderKeyEnum } from '@/components/form-item/types'

export default defineComponent({
  name: 'HdInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      validator: (value: string) => {
        return ['text', 'password'].includes(value)
      },
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const formItemContext = inject<FormItemContext>(ProviderKeyEnum.FORM_ITEM_KEY)
    const onInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      emit('update:modelValue', value)
      formItemContext?.handleInputChanged(value)
    }
    const onBlur = () => {
      formItemContext?.handleInputBlurred(props.modelValue)
    }
    return () => (
      <div class='ant-field-wrap'>
        <input value={props.modelValue} onInput={onInput} onBlur={onBlur} type={props.type}
               placeholder={attrs.placeholder as string}
               class='ant-field' />
      </div>
    )
  }
})
