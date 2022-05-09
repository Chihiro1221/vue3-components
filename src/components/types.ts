import { RequiredTreeNodeOptions } from '@/components/tree/types'
import { PropType } from '@vue/runtime-core'

type CheckboxTuple = [boolean, RequiredTreeNodeOptions];
type CustomFunction<T> = PropType<(node: T, e?: Event) => void>

export { CheckboxTuple, CustomFunction }