import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import { createPinia } from 'pinia'

import { worker } from './mocks/browser'
import 'ress'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
