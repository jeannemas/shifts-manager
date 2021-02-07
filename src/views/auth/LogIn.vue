<template>
  <div :data-vue-component="$options.name">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form ref="form" class="box" method="POST" @submit.prevent="login">
                <b-field label="Email">
                  <b-input
                    v-model="form.email"
                    type="email"
                    name="email"
                    placeholder="e.g. john.doe@example.com"
                    required
                    icon="envelope"
                    autocomplete="email"
                  />
                </b-field>

                <b-field label="Password">
                  <b-input
                    v-model="form.password"
                    type="password"
                    name="password"
                    placeholder="****************"
                    required
                    icon="lock"
                    autocomplete="current-password"
                  />
                </b-field>

                <div class="has-text-centered">
                  <button class="button is-success" type="submit">
                    Log-in
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
    currentUser(): firebase.User | null {
      return this.$store.state.auth.currentUser;
    },
  },

  watch: {
    currentUser: {
      handler(value: firebase.User | null) {
        if (!value) {
          return;
        }

        const returnPath = this.$route.query.r;

        if (returnPath) {
          this.$router.push({ path: returnPath.toString() });

          return;
        }

        this.$router.push({ name: 'HomePage' });
      },
      immediate: true,
    },
  },

  created() {
    document.title = 'Shifts Manager - Log-in';
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

        this.errorMessage = 'An error occured';
      }
    },
  },
});
</script>
