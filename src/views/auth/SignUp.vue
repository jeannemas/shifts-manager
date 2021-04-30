<template>
  <div :data-vue-component="$options.name">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form ref="form" class="box" method="POST" @submit.prevent="signup">
                <b-field :label="$t('ENTITIES.USER.NAME.LABEL')">
                  <b-input
                    v-model="form.displayName"
                    type="text"
                    name="name"
                    :placeholder="$t('ENTITIES.USER.NAME.PLACEHOLDER')"
                    required
                    icon="user"
                    autocomplete="name"
                  />
                </b-field>

                <b-field :label="$t('ENTITIES.USER.EMAIL.LABEL')">
                  <b-input
                    v-model="form.email"
                    type="email"
                    name="email"
                    :placeholder="$t('ENTITIES.USER.EMAIL.PLACEHOLDER')"
                    required
                    icon="envelope"
                    autocomplete="email"
                  />
                </b-field>

                <b-field :label="$t('ENTITIES.USER.PASSWORD.LABEL')">
                  <b-input
                    v-model="form.password"
                    type="password"
                    name="password"
                    :placeholder="$t('ENTITIES.USER.PASSWORD.PLACEHOLDER')"
                    required
                    icon="lock"
                    autocomplete="new-password"
                  />
                </b-field>

                <b-field :label="$t('VIEWS.AUTH.SIGN_UP.FIELDS.CONFIRM_PASSWORD.LABEL')">
                  <b-input
                    v-model="confirmPassword"
                    type="password"
                    name="password"
                    :placeholder="$t('VIEWS.AUTH.SIGN_UP.FIELDS.CONFIRM_PASSWORD.PLACEHOLDER')"
                    required
                    icon="lock"
                    autocomplete="new-password"
                  />
                </b-field>

                <div class="has-text-centered">
                  <button class="button is-success" type="submit">
                    {{ $t('MISC.AUTH.SIGN_UP') }}
                  </button>
                </div>

                <p v-if="errorMessage" class="help is-danger has-text-centered is-size-5">
                  {{ errorMessage }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default Vue.extend({
  name: 'SignUp',

  data() {
    return {
      form: {
        displayName: null as string | null,
        email: null as string | null,
        password: null as string | null,
      },
      confirmPassword: null as string | null,
      errorMessage: null as string | null,
    };
  },

  computed: {
    ...mapGetters({ currentUser: 'auth/currentUser' }),
  },

  watch: {
    currentUser: {
      handler(value: firebase.User | null) {
        if (!value) {
          return;
        }

        this.$router.replace({ name: 'HomePage' });
      },
      immediate: true,
    },
  },

  methods: {
    async signup() {
      if (!(this.$refs.form as HTMLFormElement).checkValidity()) {
        return;
      }

      if (this.confirmPassword !== this.form.password) {
        return;
      }

      try {
        await this.$store.dispatch('auth/signup', this.form);
      } catch (error) {
        console.error(error);

        this.errorMessage = error.message;

        return;
      }

      this.$router.push({ name: 'HomePage' });
    },
  },
});
</script>
