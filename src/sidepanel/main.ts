import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './Sidepanel.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

const app = createApp(App)
app.use(createPinia())
setupApp(app)
app.mount('#app')
