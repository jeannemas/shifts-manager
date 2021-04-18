<template>
  <div :data-vue-component="$options.name">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form ref="form" class="box" method="POST" @submit.prevent="login">
                <b-field :label="$t('VIEWS.AUTH.LOG_IN.FIELDS.EMAIL.LABEL')">
                  <b-input
                    v-model="form.email"
                    type="email"
                    name="email"
                    :placeholder="$t('VIEWS.AUTH.LOG_IN.FIELDS.EMAIL.PLACEHOLDER')"
                    required
                    icon="envelope"
                    autocomplete="email"
                  />
                </b-field>

                <b-field :label="$t('VIEWS.AUTH.LOG_IN.FIELDS.PASSWORD.LABEL')">
                  <b-input
                    v-model="form.password"
                    type="password"
                    name="password"
                    :placeholder="$t('VIEWS.AUTH.LOG_IN.FIELDS.PASSWORD.PLACEHOLDER')"
                    required
                    icon="lock"
                    autocomplete="current-password"
                  />
                </b-field>

                <b-field class="has-text-centered">
                  <button class="button is-success" type="submit">
                    {{ $t('MISC.AUTH.LOG_IN') }}
                  </button>
                </b-field>

                <b-field>
                  <p v-if="errorMessage" class="notification is-danger has-text-centered">
                    {{ errorMessage }}
                  </p>
                </b-field>
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
  name: 'LogIn',

  data() {
    return {
      form: {
        email: null as string | null,
        password: null as string | null,
      },
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

        const returnPath = this.$route.query.redirect;

        if (returnPath) {
          this.$router.push({ path: returnPath.toString() });

          return;
        }

        this.$router.push({ name: 'HomePage' });
      },
      immediate: true,
    },
  },

  methods: {
    async login() {
      if (!(this.$refs.form as HTMLFormElement).checkValidity()) {
        return;
      }

      try {
        await this.$store.dispatch('auth/login', this.form);
      } catch (error) {
        console.error(error);

        this.errorMessage = this.$t('ERRORS.INVALID_LOGIN_CREDENTIALS');
      }
    },
  },
});
</script>
