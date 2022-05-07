import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import autoRegisterComponents from '@/utils/autoRegisterComponents'

const app = createApp(App)
app.use(autoRegisterComponents)
app.mount('#app')
