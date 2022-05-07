import { RuleItem } from 'async-validator'

enum ProviderKeyEnum {
  FORM_ITEM_KEY = 'form-item-key',
  FORM_KEY = 'form-key',
}

type triggerType = 'blur' | 'change'
type validateCallback = (valid: boolean) => void
type validateType = (callback?: validateCallback) => void

interface FormItemRules extends RuleItem {
  trigger?: triggerType
}

type FormItemValidate = (value: string, trigger?: string) => Promise<boolean>

interface FormItemContext {
  handleInputChanged: (value: string) => void;
  handleInputBlurred: (value: string) => void;
}

interface FormContext {
  model: Record<string, any>
  rules: Record<string, FormItemRules | FormItemRules[]>
  validate?: validateType
}

interface FormItemExtraProps {
  prop: string,
  validate: FormItemValidate
}

export {
  FormContext,
  FormItemContext,
  ProviderKeyEnum,
  FormItemRules,
  validateType,
  FormItemValidate,
  FormItemExtraProps
}