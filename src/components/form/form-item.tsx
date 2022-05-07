import { defineComponent, provide, ref, PropType, inject, onMounted, getCurrentInstance } from 'vue'
import './index.scss'
import { FormContext, FormItemContext, FormItemRules, FormItemValidate, ProviderKeyEnum } from '@/components/form/types'
import Schema from 'async-validator'

export default defineComponent({
  name: 'FormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    rules: {
      type: [Array, Object] as PropType<FormItemRules | FormItemRules[]>
    }

  },
  setup(props, { slots, expose }) {
    const errMsg = ref('')
    const formContext = inject<FormContext>(ProviderKeyEnum.FORM_KEY)
    const rule = props.rules || formContext?.rules[props.prop]
    const validate: FormItemValidate = (value, trigger) => {
      return new Promise((resolve) => {
        if (rule && props.prop) {
          const r = (rule instanceof Array ? rule : [props.rules]) as FormItemRules[]
          const rules = trigger ? r.filter(rule => (rule?.trigger ?? 'change') === trigger) : r
          if (rules.length) {
            const validator = new Schema({
              [props.prop]: rules
            })
            validator.validate({ [props.prop]: value }).then(() => {
              errMsg.value = ''
              resolve(true)
            }).catch(({ errors }) => {
              errMsg.value = errors[0].message
              resolve(false)
            })
          }
        } else {
          resolve(true)
        }
      })
    }
    expose({
      validate
    })
    // 渲染label
    const renderLabel = () => {
      return slots.label?.() ?? <label class='item-label'>{props.label}</label>
    }
    const handleInputChanged = (value: string) => {
      void validate(value, 'change')
    }
    const handleInputBlurred = (value: string) => {
      void validate(value, 'blur')
    }
    provide<FormItemContext>(ProviderKeyEnum.FORM_ITEM_KEY, {
      handleInputChanged,
      handleInputBlurred
    })
    onMounted(() => {
      // Todo：这里不知道该如何处理类型
      const instance = getCurrentInstance() as any
      instance?.proxy?.$parent?.getFormItemValidate({
        prop: props.prop,
        validate
      })
    })
    return () => (<div class='ant-form-item'>
      {renderLabel()}
      <div class='item-content'>
        <div class='item-control-wrap'>
          {slots.default?.()}
        </div>
        <div class='item-error'>{errMsg.value}</div>
      </div>
    </div>)
  }
})