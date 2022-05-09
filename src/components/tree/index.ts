import Tree from '@/components/tree/tree'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

Tree.install = (app: App) => {
  app.component(Tree.name, Tree)
}

export default Tree as SFCWithInstall<typeof Tree>