import { App } from 'vue'
import HdInput from '@/components/input/index'
import FormItem from '@/components/form/form-item'
import Form from '@/components/form/index'
import Tabs from '@/components/tabs'
import TabPane from '@/components/tabs/tab-pane'
import Tree from '@/components/tree'
import TreeNode from '@/components/tree/node'
import Checkbox from '@/components/checkbox'

const components = [HdInput, FormItem, Form, Tabs, TabPane, Tree, TreeNode, Checkbox]
export default function autoRegisterComponents(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}