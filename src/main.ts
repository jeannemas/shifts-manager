import Vue from 'vue';
import router from './router';
import store from './store';

// The base app
import App from './App.vue';

// Bootstraps scripts
import '@/bootstraps';
import vuetify from './bootstraps/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
