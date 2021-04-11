import Vue from 'vue';

// The base app
import App from '@/App.vue';

// Bootstraps scripts
import '@/bootstraps';
import vuetify from '@/bootstraps/vuetify';
import i18n from '@/bootstraps/i18n';

import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
