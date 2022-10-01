import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Index.vue')
  }
]

export const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
