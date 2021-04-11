import firebase from 'firebase/app';

import { FirestoreWrapper, getUserLocale } from '@/helpers';

interface SignUp {
  displayName: string;
  email: string;
  password: string;
}
type LogIn = Pick<SignUp, 'email' | 'password'>;

export interface AuthState {
  currentUser: firebase.User | null;
}

type AuthModule = import('vuex').Module<AuthState, Record<string, unknown>>;

const module: AuthModule = {
  namespaced: true,

  state: {
    currentUser: null,
  },

  getters: {
    currentUser: ({ currentUser }) => currentUser,
  },

  actions: {
    async signup(context, { displayName, email, password }: SignUp): Promise<void> {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

      if (!user) {
        throw new Error('User not created');
      }

      await user.updateProfile({ displayName });

      await FirestoreWrapper(user.uid)
        .user()
        .set({
          language: getUserLocale(),
        });
    },

    async login(context, { email, password }: LogIn): Promise<void> {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    },

    async signout(): Promise<void> {
      await firebase.auth().signOut();
    },
  },

  mutations: {
    SET_USER(state, user: firebase.User | null) {
      state.currentUser = user;
    },
  },
};

export default module;
