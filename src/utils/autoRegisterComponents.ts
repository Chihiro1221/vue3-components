import { App } from 'vue'
import HdInput from '@/components/input/index'
import FormItem from '@/components/form/form-item'
import Form from '@/components/form/index'
import Tabs from '@/components/tabs'
import TabPane from '@/components/tabs/tab-pane'

const components = [HdInput, FormItem, Form, Tabs, TabPane]
export default function autoRegisterComponents(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}