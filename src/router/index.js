import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const constantRouterMap = [
  {
    path: '/',
    name: 'layout',
    redirect: 'home',
    component: () => import('@/components/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页' },
      },
      {
        path: 'blog/:id',
        name: 'article',
        component: () => import('@/views/article'),
        meta: { title: '文章' },
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('@/views/blog'),
        meta: { title: '博客' },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about'),
        meta: { title: '关于' },
      },
    ],
  },
];

export default new Router({
  base: __dirname,
  mode: 'history',
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 }),
});
