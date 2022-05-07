import { App } from 'vue'
import HdInput from '@/components/input/index'
import FormItem from '@/components/form/form-item'
import Form from '@/components/form/index'

const components = [HdInput, FormItem, Form]
export default function autoRegisterComponents(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}