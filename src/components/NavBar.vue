<template>
  <div :data-vue-component="$options.name">
    <b-navbar type="is-light" shadow>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'HomePage' }">
          Shifts Manager
        </b-navbar-item>
      </template>

      <template v-if="isAuthenticated" #start>
        <b-navbar-dropdown label="Shifts" boxed>
          <b-navbar-item tag="router-link" :to="{ name: 'Shifts/Home' }">
            <b-icon icon="list" />

            <span>
              My shifts
            </span>
          </b-navbar-item>

          <b-navbar-item tag="router-link" :to="{ name: 'Shifts/New' }">
            <b-icon icon="pen" />

            <span>
              Log shift
            </span>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <template v-if="isAuthenticated">
          <b-navbar-dropdown right boxed arrowless>
            <template #label>
              <b-icon icon="user" />
            </template>

            <b-navbar-item tag="div">
              <span> Welcome {{ currentUser.displayName }}</span>
            </b-navbar-item>

            <hr class="dropdown-divider" />

            <b-navbar-item tag="router-link" :to="{ name: 'Manage/Workplaces/Home' }">
              <b-icon icon="building" />

              <span>
                My workplaces
              </span>
            </b-navbar-item>

            <hr class="dropdown-divider" />

            <b-navbar-item
              tag="router-link"
              :to="{ name: 'Auth/SignOut', query: { redirect: $route.fullPath } }"
            >
              <b-icon icon="sign-out-alt" />

              <span>
                Sign-out
              </span>
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <template v-else>
          <b-navbar-item tag="div">
            <div class="buttons">
              <router-link class="button is-primary" :to="{ name: 'Auth/SignUp' }">
                Sign-up
              </router-link>

              <router-link class="button is-dark" :to="{ name: 'Auth/LogIn' }">
                Log-in
              </router-link>
            </div>
          </b-navbar-item>
        </template>
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
