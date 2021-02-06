<template>
  <div :data-vue-component="$options.name">
    <b-navbar type="is-light" shadow>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'HomePage' }">
          <b-icon icon="home" size="is-medium" />

          <span>
            Shifts Manager
          </span>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <router-link v-if="isAuthenticated" :to="{ name: 'Auth/SignOut' }">
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

export default Vue.extend({
  name: 'NavBar',

  computed: {
    isAuthenticated(): boolean {
      return !!this.$store.state.auth.currentUser;
    },
  },
});
</script>
