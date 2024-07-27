import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/pages/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'start',
      component: StartView,
      redirect: { name: 'login' },
      children: [
        { 
          path: 'auth/login', 
          name: 'login', 
          component: () => import('@/pages/auth/LoginView.vue'),
          meta: {
            title: 'Log in'
          }
        },
        { 
          path: 'auth/signup', 
          name: 'signup', 
          component: () => import('@/pages/auth/SignupView.vue'),
          meta: {
            title: 'Sign up'
          }
        },
      ]
    },
    { 
      path: '/', 
      name: 'dashboard', 
      component: () => import('@/pages/DashboardView.vue'),
      meta: {
        title: 'Welcome back',
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach( async (to) => {
  const userIsAuthenticated =  localStorage.getItem('__@taskly/user__')
  if ( !to.meta.requiresAuth && userIsAuthenticated ) {
    return { name: 'dashboard' }
  }
  return true
})

export default router