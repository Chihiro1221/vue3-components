import { App } from 'vue'
import HdInput from '@/components/input'
import FormItem from '@/components/form-item/index'
import Tabs from '@/components/tabs/index'
import TabPane from '@/components/tab-pane/index'
import TreeNode from '@/components/tree-node/index'
import Checkbox from '@/components/checkbox/index'
import Tree from '@/components/tree/index'
import Form from '@/components/form/index'
import Table from '@/components/table'

const components = [HdInput, FormItem, Form, Tabs, TabPane, Tree, TreeNode, Checkbox, Table]
export {
  HdInput, FormItem, Form, Tabs, TabPane, Tree, TreeNode, Checkbox, Table
}
export default function autoRegisterComponents(app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}