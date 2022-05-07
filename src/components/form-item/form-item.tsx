import { defineComponent, provide, ref, PropType } from 'vue'
import './index.scss'
import { FormItemRules, ProviderKeyEnum } from '@/components/form-item/types'
import Schema from 'async-validator'

export default defineComponent({
  home: 'FormItem',
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
      type: [Array, Object] as PropType<FormItemRules | FormItemRules[]>,
      default: () => []
    }

  },
  setup(props, { slots }) {
    const errMsg = ref('')
    const validate = (value: string, trigger: string) => {
      if (!props.prop) return
      // 将符合本次触发条件的验证规则进行验证
      const rules = (Array.isArray(props.rules) ? props.rules : [props.rules]).filter(rule => (rule.trigger ?? 'change') === trigger)
      if (!rules.length) return
      const validator = new Schema({
        [props.prop]: rules
      })
      void validator.validate({ [props.prop]: value }, (errors) => {
        errMsg.value = errors ? errors[0].message! : ''
      })
    }
    // 渲染label
    const renderLabel = () => {
      return slots.label?.() ?? <label class='item-label'>{props.label}</label>
    }
    const handleInputChanged = (value: string) => {
      validate(value, 'change')
    }
    const handleInputBlurred = (value: string) => {
      validate(value, 'blur')
    }
    provide(ProviderKeyEnum.FORM_ITEM_KEY, {
      handleInputChanged,
      handleInputBlurred
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