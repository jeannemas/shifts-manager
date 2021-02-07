<template>
  <div :data-vue-component="$options.name">
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form ref="form" class="box" method="POST" @submit.prevent="signup">
                <b-field label="Name">
                  <b-input
                    v-model="form.name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    icon="user"
                    autocomplete="name"
                  />
                </b-field>

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
                    autocomplete="new-password"
                  />
                </b-field>

                <div class="has-text-centered">
                  <button class="button is-success" type="submit">
                    Sign-up
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
  name: 'SignUp',

  data() {
    return {
      form: {
        name: null as string | null,
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

        this.$router.replace({ name: 'HomePage' });
      },
      immediate: true,
    },
  },

  created() {
    document.title = 'Shifts Manager - Sign-up';
  },

  methods: {
    async signup() {
      if (!(this.$refs.form as HTMLFormElement).checkValidity()) {
        return;
      }

      try {
        await this.$store.dispatch('auth/signup', this.form);

        this.$router.push({ name: 'HomePage' });

        return;
      } catch (error) {
        console.error(error);

        this.errorMessage = 'An error occured';
      }
    },
  },
});
</script>
