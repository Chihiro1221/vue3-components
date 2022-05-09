import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import autoComponent, { Form, FormItem, Tree } from '@/components/index'

const app = createApp(App)
app.use(autoComponent)
app.mount('#app')
