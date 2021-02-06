import Vue from 'vue';
import Vuex from 'vuex';

import auth, { AuthModule } from './auth';

Vue.use(Vuex);

export default new Vuex.Store<{ auth: AuthModule }>({
  modules: {
    auth,
  },
});
