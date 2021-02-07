import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '../store';

import protectedRoutes from './protectedRoutes';
import unprotectedRoutes from './unprotectedRoutes';

Vue.use(VueRouter);

const hydrateRoutes = (routes: RouteConfig[], requireAuth: boolean): RouteConfig[] =>
  routes.map((route) => ({
    ...route,
    meta: {
      ...(route.meta || {}),
      requireAuth: 'requireAuth' in (route.meta || {}) ? route.meta.requireAuth : requireAuth,
    },
  }));

const routes: Array<RouteConfig> = [
  ...hydrateRoutes(protectedRoutes, true),

  ...hydrateRoutes(unprotectedRoutes, false),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'is-active',
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(({ meta: { requireAuth } }) => requireAuth) &&
    !store.state.auth.currentUser
  ) {
    console.log('Authentication required');

    next({ name: 'Auth/LogIn', query: { r: to.fullPath } });

    return;
  }

  next();
});

export default router;
