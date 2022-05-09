import Form from '@/components/form/form'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

Form.install = (app: App) => {
  app.component(Form.name, Form)
}
export default Form as SFCWithInstall<typeof Form>