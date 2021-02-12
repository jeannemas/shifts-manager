import firebase from 'firebase/app';
import Vue from 'vue';

import { Module } from 'vuex';

// Models
import { Workplace } from '@/models/Workplace';

export interface ManageWorkplacesModule {
  workplaces: Workplace[];
}

const module: Module<ManageWorkplacesModule, Record<string, unknown>> = {
  namespaced: true,

  state: {
    workplaces: [],
  },

  getters: {
    workplaces: ({ workplaces }) => workplaces,
  },

  actions: {
    async syncWorkplaces({ rootGetters, commit }): Promise<() => void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        return Promise.reject(new Error('User is not logged in'));
      }

      const unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('workplaces')
        .onSnapshot((snapshot) =>
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'removed') {
              commit('REMOVE_WORKPLACE', change.doc.id);
            } else {
              commit('SET_WORKPLACE', { id: change.doc.id, ...change.doc.data() });
            }
          }),
        );

      return Promise.resolve(unsubscribe);
    },

    async addWorkplace(
      { rootGetters },
      { name, address, description }: Omit<Workplace, 'id'>,
    ): Promise<void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        return Promise.reject(new Error('User is not logged in'));
      }

      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('workplaces')
          .doc()
          .set({
            name,
            address: address || null,
            description: description || null,
          } as Workplace);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },

    async saveWorkplace(
      { rootGetters },
      { id, name, address, description }: Workplace,
    ): Promise<void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        return Promise.reject(new Error('User is not logged in'));
      }

      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('workplaces')
          .doc(id)
          .update({
            name,
            address: address || null,
            description: description || null,
          } as Workplace);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },

    async removeWorkplace({ rootGetters }, workplaceId: Workplace['id']): Promise<void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        return Promise.reject(new Error('User is not logged in'));
      }

      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('workplaces')
          .doc(workplaceId)
          .delete();
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },
  },

  mutations: {
    SET_WORKPLACE({ workplaces }, workplace: Workplace) {
      const index = workplaces.findIndex(({ id }) => id === workplace.id);

      if (index < 0) {
        // The workplace does not already exist, so add it
        workplaces.push(workplace);
      } else {
        // The workplace already exist, update it
        Vue.set(workplaces, index, workplace);
      }
    },

    REMOVE_WORKPLACE({ workplaces }, workplaceId: Workplace['id']) {
      const index = workplaces.findIndex(({ id }) => id === workplaceId);

      if (index < 0) {
        console.error(`Workplace '${workplaceId}' does not exist, cannot remove it`);
      } else {
        workplaces.splice(index, 1);
      }
    },
  },
};

export default module;
