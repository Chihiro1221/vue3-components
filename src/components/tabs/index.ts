import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'
import Tabs from '@/components/tabs/tabs'

Tabs.install = (app: App) => {
  app.component(Tabs.name, Tabs)
}

export default Tabs as SFCWithInstall<typeof Tabs>