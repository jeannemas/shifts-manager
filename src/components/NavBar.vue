<template>
  <div :data-vue-component="$options.name">
    <b-navbar type="is-light" shadow>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'HomePage' }">
          {{ $t('MISC.APP_NAME') }}
        </b-navbar-item>
      </template>

      <template v-if="isAuthenticated" #start>
        <b-navbar-dropdown
          :label="$t('COMPONENTS.NAVBAR.AUTHENTICATED.SHIFTS_DROPDOWN.HEADER')"
          boxed
        >
          <b-navbar-item tag="router-link" :to="{ name: 'Shifts/Home' }">
            <b-icon icon="list" />

            <span>
              {{ $t('COMPONENTS.NAVBAR.AUTHENTICATED.SHIFTS_DROPDOWN.ITEMS.MY_SHIFTS') }}
            </span>
          </b-navbar-item>

          <b-navbar-item tag="router-link" :to="{ name: 'Shifts/New' }">
            <b-icon icon="pen" />

            <span>
              {{ $t('COMPONENTS.NAVBAR.AUTHENTICATED.SHIFTS_DROPDOWN.ITEMS.LOG_SHIFT') }}
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
              <span>
                {{
                  $t('COMPONENTS.NAVBAR.AUTHENTICATED.GREETING_MESSAGE', {
                    name: currentUser.displayName,
                  })
                }}
              </span>
            </b-navbar-item>

            <hr class="dropdown-divider" />

            <b-navbar-item tag="router-link" :to="{ name: 'Manage/Workplaces/Home' }">
              <b-icon icon="building" />

              <span>
                {{ $t('COMPONENTS.NAVBAR.AUTHENTICATED.MANAGE_WORKPLACES') }}
              </span>
            </b-navbar-item>

            <hr class="dropdown-divider" />

            <b-navbar-item tag="router-link" :to="{ name: 'Manage/Account/Home' }">
              <b-icon icon="user-circle" />

              <span>
                {{ $t('VIEWS.MANAGE.ACCOUNT.PAGE_TITLE') }}
              </span>
            </b-navbar-item>

            <hr class="dropdown-divider" />

            <b-navbar-item
              tag="router-link"
              :to="{ name: 'Auth/SignOut', query: { redirect: $route.fullPath } }"
            >
              <b-icon icon="sign-out-alt" />

              <span>
                {{ $t('MISC.AUTH.SIGN_OUT') }}
              </span>
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <template v-else>
          <b-navbar-item tag="div">
            <div class="buttons">
              <router-link class="button is-primary" :to="{ name: 'Auth/SignUp' }">
                {{ $t('MISC.AUTH.SIGN_UP') }}
              </router-link>

              <router-link class="button is-dark" :to="{ name: 'Auth/LogIn' }">
                {{ $t('MISC.AUTH.LOG_IN') }}
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
