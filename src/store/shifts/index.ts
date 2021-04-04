import Vue from 'vue';

import FirestoreWrapper from '@/helpers';

// Models
import { Shift } from '@/models/Shift';
import { RetrievableEntity } from '@/models/RetrievableEntity';

export interface ShiftsState {
  shifts: RetrievableEntity<Shift>[];
}

type ShiftsModule = import('vuex').Module<ShiftsState, Record<string, unknown>>;

const module: ShiftsModule = {
  namespaced: true,

  state: {
    shifts: [],
  },

  getters: {
    shifts: ({ shifts }) => shifts,
  },

  actions: {
    async syncShifts({ rootGetters, commit }): Promise<() => void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      return FirestoreWrapper(currentUser.uid)
        .user()
        .collection('shifts')
        .onSnapshot((snapshot) =>
          snapshot.docChanges().forEach((change) => {
            const { id } = change.doc;
            const payload = change.doc.data();

            // eslint-disable-next-line no-underscore-dangle
            if (payload?._deleted) {
              // The doc has the deleted flag
              commit('REMOVE_SHIFT', id);

              return;
            }

            if (change.type === 'removed') {
              commit('REMOVE_SHIFT', id);
            } else {
              commit('SET_SHIFT', { id, ...payload });
            }
          }),
        );
    },

    async addShift({ rootGetters }, shift: Shift): Promise<void> {
      const { workplaceId, startTime, endTime, title, description } = shift;
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      const timestamp = Date.now();

      await FirestoreWrapper(currentUser.uid)
        .shift()
        .set({
          workplaceId,
          startTime,
          endTime,
          title,
          description,
          _createdAt: timestamp,
          _updatedAt: timestamp,
        });
    },

    async saveShift({ rootGetters }, shift: RetrievableEntity<Shift>): Promise<void> {
      const { id, workplaceId, startTime, endTime, title, description } = shift;
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      await FirestoreWrapper(currentUser.uid)
        .shift(id)
        .update({
          workplaceId,
          startTime,
          endTime,
          title,
          description,
          _updatedAt: Date.now(),
        });
    },

    async removeShift({ rootGetters }, shiftId: RetrievableEntity<Shift>['id']): Promise<void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      await FirestoreWrapper(currentUser.uid)
        .shift(shiftId)
        .update({
          _deleted: true,
          _updatedAt: Date.now(),
        });
    },
  },

  mutations: {
    SET_SHIFT({ shifts }, shift: RetrievableEntity<Shift>) {
      const index = shifts.findIndex(({ id }) => id === shift.id);

      if (index < 0) {
        // The shift does not already exist, so add it
        shifts.push(shift);
      } else {
        // The shift already exist, update it
        Vue.set(shifts, index, shift);
      }
    },

    REMOVE_SHIFT({ shifts }, shiftId: RetrievableEntity<Shift>['id']) {
      const index = shifts.findIndex(({ id }) => id === shiftId);

      if (index >= 0) {
        shifts.splice(index, 1);
      }
    },
  },
};

export default module;
