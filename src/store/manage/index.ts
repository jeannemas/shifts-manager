import { Module } from 'vuex';

import workplaces from './workplaces';

const module: Module<unknown, Record<string, unknown>> = {
  namespaced: true,

  modules: {
    workplaces,
  },
};

export default module;
