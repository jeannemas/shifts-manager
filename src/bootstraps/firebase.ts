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

let unsubscribe: (() => void) | null = null;

firebase.auth().onAuthStateChanged(async (user) => {
  store.commit('auth/SET_USER', user);

  if (unsubscribe) {
    unsubscribe();

    unsubscribe = null;
  }

  try {
    if (user) {
      unsubscribe = await store.dispatch('manage/workplaces/syncWorkplaces');
    }
  } catch (error) {
    console.error(error);
  }
});
