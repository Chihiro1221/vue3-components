import { RequiredTreeNodeOptions } from '@/components/tree/types'
import { PropType } from '@vue/runtime-core'
import { App } from 'vue'

type CheckboxTuple = [boolean, RequiredTreeNodeOptions];
type CustomFunction<T> = PropType<(node: T, e?: Event) => void>
type SFCWithInstall<T> = T & { install: (app: App) => void }
type ClickType = 'single' | 'ctrl' | 'shift';

export { CheckboxTuple, CustomFunction, SFCWithInstall, ClickType }