import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import store from '../store';

firebase.initializeApp({
  apiKey: 'AIzaSyBWLrSoa99txl7TBAiDMNCb7ynknydilwE',
  authDomain: 'shifts-manager-610bb.firebaseapp.com',
  projectId: 'shifts-manager-610bb',
  storageBucket: 'shifts-manager-610bb.appspot.com',
  messagingSenderId: '800988943525',
  appId: '1:800988943525:web:df659bee658a146482e94c',
});

const modules = {
  list: {} as Record<string, () => void>,

  async sync(maps: Record<string, () => void>): Promise<void> {
    const list: Promise<unknown>[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const [action, callback] of Object.entries(maps)) {
      // Unsubscribe first
      if (action in this.list && this.list[action]) {
        this.list[action]();

        delete this.list[action];
      }

      const dispatch = store.dispatch(action);

      list.push(dispatch);
      this.list[action] = await dispatch;

      callback.call(null);
    }

    await Promise.all(list);
  },
};

firebase.auth().onAuthStateChanged(async (user) => {
  store.commit('auth/SET_USER', user);

  try {
    if (user) {
      await modules.sync({
        'manage/workplaces/syncWorkplaces': () => console.log('Synced workplaces'),
        'shifts/syncShifts': () => console.log('Synced shifts'),
      });
    }
  } catch (error) {
    console.error(error);
  }
});
