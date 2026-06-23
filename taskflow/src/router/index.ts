import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'tasks',
        component: () => import('@/views/TaskView.vue')
      },
      {
        path: 'tasks/:id',
        component: () => import('@/views/TaskDetailPage.vue')
      },
      {
        path: 'completed',
        component: () => import('@/views/CompletedView.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
