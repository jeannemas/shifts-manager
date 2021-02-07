import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  // Homepage
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
  },

  // Auth
  {
    path: '/auth',
    name: 'Auth/Home',
    redirect: { name: 'Auth/LogIn' },
    component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/AuthHome.vue'),
    children: [
      {
        path: 'signup',
        name: 'Auth/SignUp',
        component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/SignUp.vue'),
      },
      {
        path: 'login',
        name: 'Auth/LogIn',
        component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/LogIn.vue'),
      },
      {
        path: 'signout',
        name: 'Auth/SignOut',
        component: () => import('@/views/auth/SignOut.vue'),
      },
    ],
  },
];

export default routes;
