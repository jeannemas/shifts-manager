import { RouteConfig } from 'vue-router';

import store from '../store';

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
    redirect: {
      name: 'Auth/LogIn',
    },
    component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/AuthHome.vue'),
    children: [
      {
        path: 'signup',
        name: 'Auth/SignUp',
        component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/SignUp.vue'),
        beforeEnter(to, from, next) {
          const { currentUser } = store.state.auth;

          if (currentUser) {
            next({ name: 'HomePage' });

            return;
          }

          next();
        },
      },
      {
        path: 'login',
        name: 'Auth/LogIn',
        component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/LogIn.vue'),
        beforeEnter(to, from, next) {
          const { currentUser } = store.state.auth;

          if (currentUser) {
            next({ name: 'HomePage' });

            return;
          }

          next();
        },
      },
    ],
  },
];

export default routes;
