import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/Index.vue')
  },
  {
    path: '/events/:id',
    name: 'Event',
    component: () => import('@/pages/EventPage.vue')
  },
  {
    path: '/admin/events',
    name: 'AdminEvents',
    component: () => import('@/pages/admin/EventsPage.vue')
  },
  {
    path: '/admin/events/:eventId',
    name: 'AdminEventDetail',
    component: () => import('@/pages/admin/EventDetailPage.vue')
  },
  {
    path: '/admin/events/new',
    name: 'AdminNewEvents',
    component: () => import('@/pages/admin/CreateNewEventPage.vue')
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
