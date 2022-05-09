import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import autoComponent from '@/components/index'

const app = createApp(App)
app.use(autoComponent)
app.mount('#app')
