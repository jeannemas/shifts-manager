import { RouteConfig } from 'vue-router';

import store from '@/store';
import i18n from '@/bootstraps/i18n';

const routes: Array<RouteConfig> = [
  // Homepage
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: i18n.t('VIEWS.HOME.PAGE_TITLE'),
    },
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
      },
      {
        path: 'signup',
        name: 'Auth/SignUp',
        component: () => import('@/views/auth/SignUp.vue'),
        meta: {
          title: i18n.t('VIEWS.AUTH.SIGN_UP.PAGE_TITLE'),
        },
      },
      {
        path: 'login',
        name: 'Auth/LogIn',
        component: () => import('@/views/auth/LogIn.vue'),
        meta: {
          title: i18n.t('VIEWS.AUTH.LOG_IN.PAGE_TITLE'),
        },
      },
      {
        path: 'signout',
        name: 'Auth/SignOut',
        async beforeEnter(to, from, next) {
          try {
            await store.dispatch('auth/signout');
          } catch (error) {
            console.error(error);
          } finally {
            const returnPath = to.query.redirect;

            if (returnPath) {
              next({ path: returnPath.toString() });
            } else {
              next({ name: 'HomePage' });
            }
          }
        },
      },
    ],
  },
];

export default routes;
