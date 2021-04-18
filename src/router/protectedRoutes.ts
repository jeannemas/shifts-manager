import i18n from '@/bootstraps/i18n';
import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '/shifts',
    redirect: { name: 'Shifts/Home' },
    component: () => import('@/views/shifts/ShiftRoot.vue'),
    children: [
      {
        path: '',
        name: 'Shifts/Home',
        component: () => import('@/views/shifts/ShiftHome.vue'),
        meta: {
          title: i18n.t('VIEWS.SHIFTS.HOME.PAGE_TITLE'),
        },
      },
      {
        path: 'new',
        name: 'Shifts/New',
        component: () => import('@/views/shifts/ShiftNew.vue'),
        meta: {
          title: i18n.t('VIEWS.SHIFTS.NEW.PAGE_TITLE'),
        },
      },
      {
        path: 'edit/:shiftId',
        name: 'Shifts/Edit',
        props: true,
        component: () => import('@/views/shifts/ShiftEdit.vue'),
        meta: {
          title: i18n.t('VIEWS.SHIFTS.EDIT.PAGE_TITLE'),
        },
      },
    ],
  },
  {
    path: '/manage',
    redirect: { name: 'HomePage' },
    component: () => import('@/views/manage/ManageRoot.vue'),
    children: [
      {
        path: 'workplaces',
        redirect: { name: 'Manage/Workplaces/Home' },
        component: () => import('@/components/RootView.vue'),
        children: [
          {
            path: '',
            name: 'Manage/Workplaces/Home',
            component: () => import('@/views/manage/workplaces/ManageWorkplacesHome.vue'),
            meta: {
              title: i18n.t('VIEWS.MANAGE.WORKPLACES.PAGE_TITLE'),
            },
          },
        ],
      },
    ],
  },
];

export default routes;
