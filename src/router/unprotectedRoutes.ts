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
    component: () => import('@/views/auth/AuthRoot.vue'),
    children: [
      {
        path: '',
        name: 'Auth/Home',
        redirect: { name: 'Auth/LogIn' },
        component: () => import('@/views/auth/AuthHome.vue'),
      },
      {
        path: 'signup',
        name: 'Auth/SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
      },
      {
        path: 'login',
        name: 'Auth/LogIn',
        component: () => import('@/views/auth/LogIn.vue'),
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
