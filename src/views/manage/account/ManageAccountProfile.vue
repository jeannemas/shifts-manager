<template>
  <div>
    <h1 class="title">
      {{ $t('VIEWS.MANAGE.ACCOUNT.PAGES.PROFILE.HEADER') }}
    </h1>

    <v-divider />

    <form @submit="submit">
      <b-field :label="$t('ENTITIES.USER.NAME.LABEL')" message="Your display name">
        <b-input
          v-model="name"
          type="text"
          :placeholder="$t('ENTITIES.USER.NAME.PLACEHOLDER')"
          required
        />
      </b-field>

      <button class="button is-primary" type="submit">
        {{ $t('VIEWS.MANAGE.ACCOUNT.PAGES.PROFILE.UPDATE_PROFILE_BTN') }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
  name: 'ManageAccountProfile',

  data() {
    return {
      name: null as string | null,
    };
  },

  async mounted() {
    const user: firebase.User = this.$store.getters['auth/currentUser'];

    this.name = user.displayName;
  },

  methods: {
    async submit() {
      // TODO Do something interesting here
    },
  },
});
</script>
