import Checkbox from '@/components/checkbox/checkbox'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

Checkbox.install = (app: App) => {
  app.component(Checkbox.name, Checkbox)
}
export default Checkbox as SFCWithInstall<typeof Checkbox>