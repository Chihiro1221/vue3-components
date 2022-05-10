import Table from './table.vue'
import { App } from 'vue'
import { SFCWithInstall } from '@/components/types'

Table.install = (app: App) => {
  app.component(Table.name, Table)
}
export default Table as SFCWithInstall<typeof Table>