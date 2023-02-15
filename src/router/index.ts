import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Index.vue')
  },
  {
    path: '/meeting/:id',
    name: 'Meeting',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    component: () => {} // TODO: ページ作成したらここに書く
  }
]

export const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
