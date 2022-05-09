import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'
import TabPane from '@/components/tabs/tab-pane'

TabPane.install = (app: App) => {
  app.component(TabPane.name, TabPane)
}

export default TabPane as SFCWithInstall<typeof TabPane>