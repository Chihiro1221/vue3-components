import Input from '@/components/input/input'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

Input.install = (app: App) => {
  app.component(Input.name, Input)
}

export default Input as SFCWithInstall<typeof Input>