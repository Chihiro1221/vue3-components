import FormItem from '@/components/form/form-item'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

FormItem.install = (app: App) => {
  app.component(FormItem.name, FormItem)
}

export default FormItem as SFCWithInstall<typeof FormItem>