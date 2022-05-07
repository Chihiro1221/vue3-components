import { RuleItem } from 'async-validator'

enum ProviderKeyEnum {
  FORM_ITEM_KEY = 'form-item-key',
}

interface FormItemContext {
  handleInputChanged: (value: string) => void;
  handleInputBlurred: (value: string) => void;
}

type triggerType = 'blur' | 'change'

interface FormItemRules extends RuleItem {
  trigger?: triggerType
}

export { FormItemContext, ProviderKeyEnum, FormItemRules }