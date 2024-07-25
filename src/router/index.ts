import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

import StartView from '@/pages/StartView.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'start', 
    component: StartView 
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router