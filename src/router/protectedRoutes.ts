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
      },
      {
        path: 'new',
        name: 'Shifts/New',
        component: () => import('@/views/shifts/ShiftNew.vue'),
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
          },
          /* {
            path: 'new',
            name: 'Manage/Workplaces/New',
            component: () => import('@/views/manage/workplaces/ManageWorkplacesNew.vue'),
          },
          {
            path: 'edit/:workplaceId',
            name: 'Manage/Worplaces/Edit',
            component: () => import('@/views/manage/workplaces/ManageWorkplacesEdit.vue'),
            props: true,
          },
          {
            path: 'delete/:workplaceId',
            name: 'Manage/Workplaces/Delete',
            component: () => import('@/views/manage/workplaces/ManageWorkplacesDelete.vue'),
            props: true,
          }, */
        ],
      },
    ],
  },
];

export default routes;
