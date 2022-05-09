import TreeNode from '@/components/tree/node'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

TreeNode.install = (app: App) => {
  app.component(TreeNode.name, TreeNode)
}

export default TreeNode as SFCWithInstall<typeof TreeNode>