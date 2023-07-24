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
  },
  {
    path: '/admin/meetings',
    name: 'AdminMeetings',
    component: () => import('@/pages/admin/MeetingsPage.vue')
  },
  {
    path: '/admin/events/:eventId',
    name: 'AdminEventDetail',
    component: () => import('@/pages/admin/EventDetailPage.vue')
  },
  {
    path: '/admin/meetings/new',
    name: 'AdminNewMeetings',
    component: () => import('@/pages/admin/CreateNewMeetingPage.vue')
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

export const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
