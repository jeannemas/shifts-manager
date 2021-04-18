import firebase from 'firebase/app';

import { FirestoreWrapper, getUserLocale } from '@/helpers';

interface SignUp {
  displayName: string;
  email: string;
  password: string;
}
type LogIn = Pick<SignUp, 'email' | 'password'>;

type UserSession = Pick<firebase.User, 'displayName' | 'email' | 'uid'> & {
  metadata: {
    language: string;
  };
};

export interface AuthState {
  currentUser: UserSession | null;
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
    async setUser({ commit }, user: firebase.User | null) {
      if (!user) {
        commit('SET_USER', null);

        return;
      }

      const { displayName, email, uid } = user;
      const doc = await FirestoreWrapper(uid)
        .user()
        .get();

      commit('SET_USER', {
        displayName,
        email,
        uid,
        metadata: doc.data(),
      } as UserSession);
    },

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
        } as UserSession['metadata']);
    },

    async login(context, { email, password }: LogIn): Promise<void> {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    },

    signout: () => firebase.auth().signOut(),
  },

  mutations: {
    SET_USER(state, user: UserSession | null) {
      state.currentUser = user;
    },
  },
};

export default module;
