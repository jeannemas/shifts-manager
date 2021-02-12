import firebase from 'firebase/app';

import { Module } from 'vuex';

export interface AuthModule {
  currentUser: firebase.User | null;
}

const module: Module<AuthModule, Record<string, unknown>> = {
  namespaced: true,

  state: {
    currentUser: null,
  },

  getters: {
    currentUser: ({ currentUser }) => currentUser,
  },

  actions: {
    async signup(
      context,
      { name: displayName, email, password }: { name: string; email: string; password: string },
    ): Promise<void> {
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

        if (!user) {
          throw new Error('User not created');
        }

        await user.updateProfile({ displayName });
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },

    async login(context, { email, password }: { email: string; password: string }): Promise<void> {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },

    async signout(): Promise<void> {
      try {
        await firebase.auth().signOut();
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },
  },

  mutations: {
    SET_USER(state, user: firebase.User | null) {
      state.currentUser = user;
    },
  },
};

export default module;
