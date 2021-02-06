import { Module } from 'vuex';

export interface AuthModule {
  currentUser: null;
}

const module: Module<AuthModule, Record<string, unknown>> = {
  namespaced: true,

  state: {
    currentUser: null,
  },

  getters: {},

  actions: {},

  mutations: {},
};

export default module;
