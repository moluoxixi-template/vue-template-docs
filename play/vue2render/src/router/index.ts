import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// 自动生成的路由 (在实际项目中可能需要调整)
const routesChildrens = [
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo/index.vue')
  }
];

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('./layout.vue'),
    redirect: '/demo', // 替换为你的默认路由
    children: routesChildrens
  },
  {
    // 修复Vue Router 3的通配符语法
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.VITE_APP_CODE || '/',
  routes
});

router.beforeEach((to, from, next) => {
  // 这里可以添加路由守卫逻辑
  next();
});

export default router;
