import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './Popup.vue'
import '~/styles'
import 'uno.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
