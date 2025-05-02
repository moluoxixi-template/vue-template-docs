import { createRouter, createWebHistory } from 'vue-router'
import pages from '@/views'
import { getRoutes } from '@/utils'

const pagesRoutes = getRoutes(pages)
const routesChildrens = [...pagesRoutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layout/index.vue'),
      redirect: routesChildrens[0] ? routesChildrens[0].path : '',
      children: routesChildrens,
    },
  ],
})

export default router
