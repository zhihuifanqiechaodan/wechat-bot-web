import { createRouter, createWebHashHistory } from 'vue-router';

import layout from '@/layout/layout';

const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/splash/splash')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login')
  }
];

const asyncRoutes = [
  {
    path: '/bot',
    component: layout,
    children: [
      {
        path: 'message',
        component: () => import('@/views/message/message')
      },
      {
        path: 'setting',
        component: () => import('@/views/setting/setting')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes.concat(asyncRoutes)
});

export default router;
