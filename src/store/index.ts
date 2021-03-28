import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import manage from './manage';
import shifts from './shifts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    manage,
    shifts,
  },
});
