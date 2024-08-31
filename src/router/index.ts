import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/pages/StartView.vue'
import { get } from 'lodash'
import { useProjectStore } from '@/stores/project'

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
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/pages/NotFound.vue'),
      meta: {
        title: '404 - Not found',
      }
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
          beforeEnter: async () => {
            await useProjectStore().listProjects()
          },
          meta: {
            requiresAuth: true
          }
        },
        { 
          path: 'projects/:id', 
          name: 'projectOverview', 
          component: () => import('@/pages/project/ProjectOverview.vue'),
          beforeEnter: async (to) => {
            try {
              await useProjectStore().getProject(get(to, 'params.id', '') as string)
            } catch (error) {
              return false
            }
          },
          meta: {
            requiresAuth: true,
            title: 'Project overview'
          }
        },
        {
          path: 'trash-bin',
          name: 'trashBin',
          component: () => import('@/pages/TrashBinView.vue'),
          beforeEnter: async () => {
            await useProjectStore().listProjects({ data: { filter: { isDeleted: true } }})
          },
          meta: {
            title: 'Trash bin',
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/projects/:id/join/:token',
      name: 'projectInvitation',
      component: () => import('@/pages/project/ProjectInvitationView.vue'),
      beforeEnter: async (to) => {
        try {
          await useProjectStore().getProject(get(to, 'params.id', '') as string)
          return true
        } catch (error) {
          return false
        }
      },
      meta: {
        requiresAuth: true,
        title: 'Project invitation'
      }
    }
  ]
})

router.beforeEach( async (to) => {
  const user =  JSON.parse(localStorage.getItem('__@taskly/user__') as string)
  if ( to.name !== 'notFound' && !to.meta.requiresAuth && get(user, 'accountIsVerified', false)) {
    return { name: 'dashboard' }
  }
  return true
})

router.afterEach((to) => {
  setPageTitle(to.meta.title?.toString())
})

export default router