import { PropType } from '@vue/runtime-core'

type CustomFunction<T> = PropType<(node: T, e?: Event) => void>

export { CustomFunction }