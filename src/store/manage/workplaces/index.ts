import Vue from 'vue';

import { FirestoreWrapper } from '@/helpers';

// Models
import { Workplace } from '@/models/Workplace';
import { RetrievableEntity } from '@/models/RetrievableEntity';

export interface ManageWorkplacesState {
  workplaces: RetrievableEntity<Workplace>[];
}

type ManageWorkplacesModule = import('vuex').Module<ManageWorkplacesState, Record<string, unknown>>;

const module: ManageWorkplacesModule = {
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
        throw new Error('User is not logged in');
      }

      return FirestoreWrapper(currentUser.uid)
        .user()
        .collection('workplaces')
        .onSnapshot((snapshot) =>
          snapshot.docChanges().forEach((change) => {
            const { id } = change.doc;
            const payload = change.doc.data();

            // eslint-disable-next-line no-underscore-dangle
            if (payload?._deleted) {
              // The doc has the deleted flag
              commit('REMOVE_WORKPLACE', id);

              return;
            }

            if (change.type === 'removed') {
              commit('REMOVE_WORKPLACE', id);
            } else {
              commit('SET_WORKPLACE', { id, ...payload });
            }
          }),
        );
    },

    async addWorkplace({ rootGetters }, workplace: Workplace): Promise<void> {
      const { name, address, description } = workplace;
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      const timestamp = Date.now();

      await FirestoreWrapper(currentUser.uid)
        .workplace()
        .set({
          name,
          address,
          description,
          _createdAt: timestamp,
          _updatedAt: timestamp,
        });
    },

    async saveWorkplace({ rootGetters }, workplace: RetrievableEntity<Workplace>): Promise<void> {
      const { id, name, address, description } = workplace;
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      await FirestoreWrapper(currentUser.uid)
        .workplace(id)
        .update({
          name,
          address,
          description,
          _updatedAt: Date.now(),
        });
    },

    async removeWorkplace(
      { rootGetters },
      workplaceId: RetrievableEntity<Workplace>['id'],
    ): Promise<void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      FirestoreWrapper(currentUser.uid)
        .workplace(workplaceId)
        .update({
          _deleted: true,
          _updatedAt: Date.now(),
        });
    },
  },

  mutations: {
    SET_WORKPLACE({ workplaces }, workplace: RetrievableEntity<Workplace>) {
      const index = workplaces.findIndex(({ id }) => id === workplace.id);

      if (index < 0) {
        // The workplace does not already exist, so add it
        workplaces.push(workplace);
      } else {
        // The workplace already exist, update it
        Vue.set(workplaces, index, workplace);
      }
    },

    REMOVE_WORKPLACE({ workplaces }, workplaceId: RetrievableEntity<Workplace>['id']) {
      const index = workplaces.findIndex(({ id }) => id === workplaceId);

      if (index >= 0) {
        workplaces.splice(index, 1);
      }
    },
  },
};

export default module;
