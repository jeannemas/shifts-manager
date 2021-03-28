import firebase from 'firebase/app';
import Vue from 'vue';

import { Module } from 'vuex';

// Models
import { Shift } from '@/models/Shift';

export interface ShiftsModule {
  shifts: Shift[];
}

const module: Module<ShiftsModule, Record<string, unknown>> = {
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
        return Promise.reject(new Error('User is not logged in'));
      }

      const unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('shifts')
        .onSnapshot((snapshot) =>
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'removed') {
              commit('REMOVE_SHIFT', change.doc.id);
            } else {
              commit('SET_SHIFT', { id: change.doc.id, ...change.doc.data() });
            }
          }),
        );

      return Promise.resolve(unsubscribe);
    },

    async addShift(
      { rootGetters },
      { workplace = null, startTime, endTime = null, title, description = null }: Omit<Shift, 'id'>,
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
          .collection('shifts')
          .doc()
          .set({ workplace, startTime, endTime, title, description } as Omit<Shift, 'id'>);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },

    async saveShift(
      { rootGetters },
      { id, workplace = null, startTime, endTime = null, title, description = null }: Shift,
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
          .collection('shifts')
          .doc(id as string)
          .update({ workplace, startTime, endTime, title, description } as Omit<Shift, 'id'>);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },

    async removeShift({ rootGetters }, shiftId: NonNullable<Shift['id']>): Promise<void> {
      const currentUser = rootGetters['auth/currentUser'];

      if (!currentUser) {
        return Promise.reject(new Error('User is not logged in'));
      }

      try {
        await firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('shifts')
          .doc(shiftId)
          .delete();
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve();
    },
  },

  mutations: {
    SET_SHIFT({ shifts }, shift: Shift) {
      const index = shifts.findIndex(({ id }) => id === shift.id);

      if (index < 0) {
        // The shift does not already exist, so add it
        shifts.push(shift);
      } else {
        // The shift already exist, update it
        Vue.set(shifts, index, shift);
      }
    },

    REMOVE_SHIFT({ shifts }, shiftId: Shift['id']) {
      const index = shifts.findIndex(({ id }) => id === shiftId);

      if (index < 0) {
        console.error(`Shift '${shiftId}' does not exist, cannot remove it`);
      } else {
        shifts.splice(index, 1);
      }
    },
  },
};

export default module;
