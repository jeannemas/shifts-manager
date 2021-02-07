<template>
  <div :data-vue-component="$options.name">
    <b-navbar type="is-light" shadow>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'HomePage' }">
          <span>
            Shifts Manager
          </span>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item v-if="isAuthenticated" tag="span">
          Welcome {{ currentUser.displayName }}
        </b-navbar-item>

        <b-navbar-item tag="div">
          <router-link v-if="isAuthenticated" class="button is-dark" :to="{ name: 'Auth/SignOut' }">
            Sign-out
          </router-link>

          <div v-else class="buttons">
            <router-link class="button is-primary" :to="{ name: 'Auth/SignUp' }">
              Sign-up
            </router-link>

            <router-link class="button is-dark" :to="{ name: 'Auth/LogIn' }">
              Log-in
            </router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase/app';

export default Vue.extend({
  name: 'NavBar',

  computed: {
    currentUser(): firebase.User | null {
      return this.$store.state.auth.currentUser;
    },

    isAuthenticated(): boolean {
      return !!this.currentUser;
    },
  },
});
</script>
