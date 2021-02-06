import Vue from 'vue';
import router from './router';
import store from './store';

// The base app
import App from './App.vue';

// Bootstraps scripts
import '@/bootstraps';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
