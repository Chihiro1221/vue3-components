import { App } from 'vue'
import InputDemo from '../components/input/demo.vue'
import FormItemDemo from '../components/form-item/demo.vue'

const components = [InputDemo, FormItemDemo]
export default function autoRegisterComponents(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}