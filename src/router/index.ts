import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { AuthState } from '@/store/auth';

import store from '@/store';
import titleManager from '@/bootstraps/page-title';
import i18n from '@/bootstraps/i18n';

import protectedRoutes from './protectedRoutes';
import unprotectedRoutes from './unprotectedRoutes';

Vue.use(VueRouter);

/**
 * Hydrate all the routes (including their children) with some meta values
 *
 * @param routes The routes to hydrate
 * @param meta The meta values to use
 */
const hydrateRoutes = (
  routes: RouteConfig[] = [],
  meta: Record<string, unknown> = {},
): RouteConfig[] =>
  routes.map((route) => ({
    ...route,
    meta: {
      ...(route.meta || {}),
      ...meta,
    },
    children: hydrateRoutes(route.children, meta),
  }));

const routes: Array<RouteConfig> = [
  // The protected routes: require auth
  ...hydrateRoutes(protectedRoutes, { requireAuth: true }),

  // The unprotected routes: doesn't require auth, can be used as guest
  ...hydrateRoutes(unprotectedRoutes, { requireAuth: false }),

  // 404
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'is-active',
});

// Logger
router.beforeEach((to, from, next) => {
  console.log(`[Navigation] Navigating to '${to.fullPath}'`);

  next();
});

// Auth verification
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(({ meta: { requireAuth } }) => requireAuth) &&
    !store.getters['auth/currentUser']
  ) {
    console.log('Authentication required');

    next({ name: 'Auth/LogIn', query: { redirect: to.fullPath } });

    return;
  }

  next();
});

// Title update
router.beforeEach((to, from, next) => {
  const title: string | undefined = to.meta?.title;

  if (title) {
    titleManager.updateTitle(title);
  }

  next();
});

// i18n
router.beforeEach((to, from, next) => {
  const currentUser = store.getters['auth/currentUser'] as AuthState['currentUser'];

  i18n.locale = currentUser?.metadata?.language || i18n.locale;

  next();
});

export default router;
