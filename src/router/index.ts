import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/pages/StartView.vue'
import { get } from 'lodash'
import { useProjectStore } from '@/stores/project'
import { useTaskStore } from '@/modules/task/store'

const setPageTitle = (title = '') => {
  document.title = `Taskly :: ${ title }`
}

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
        { 
          path: 'account/verify', 
          name: 'verifyAccount', 
          component: () => import('@/pages/verify/VerifyAccountView.vue'),
          meta: {
            title: 'Verify account'
          }
        },
      ]
    },
    { 
      path: '/', 
      name: 'dashboard', 
      component: () => import('@/pages/DashboardView.vue'),
      redirect: { name: 'projectList' },
      meta: {
        title: 'Welcome back',
        requiresAuth: true
      },
      children: [
        { 
          path: '', 
          name: 'projectList', 
          component: () => import('@/pages/project/ProjectListView.vue'),
          meta: {
            requiresAuth: true
          }
        },
        { 
          path: 'projects/:id', 
          name: 'projectOverview', 
          component: () => import('@/pages/project/ProjectOverview.vue'),
          beforeEnter: async (to) => {
            await useProjectStore().getProject(get(to, 'params.id', '') as string)
            await useTaskStore().listTasks({ data: { projectId: get(to, 'params.id', '') as string } })
          },
          meta: {
            requiresAuth: true,
            title: 'Project overview'
          }
        },
      ]
    },
  ]
})

router.beforeEach( async (to) => {
  const user =  JSON.parse(localStorage.getItem('__@taskly/user__') as string)
  if ( !to.meta.requiresAuth && get(user, 'accountIsVerified', false) ) {
    return { name: 'dashboard' }
  }
  return true
})

router.afterEach((to) => {
  setPageTitle(to.meta.title?.toString())
})

export default router