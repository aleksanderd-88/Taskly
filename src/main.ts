import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/layouts/App.vue'

import router from '@/router'
import primevue from './plugins/primevue'
import { useApiStore } from '@/stores/api'
import { useAppStore } from './stores/app'

const app = createApp(App)
const pinia = createPinia()

app
.use(pinia)
.use(router)
.use(primevue)
.mount('#app')

useAppStore().getVersion()
useApiStore().checkHealth()
