<template>
  <div :data-vue-component="$options.name">
    <nav-bar />

    <section class="section">
      <div class="container has-text-centered">
        <h1 class="title is-spaced">
          404 Page not found
        </h1>

        <h3 class="subtitle">
          Page <code>{{ $route.fullPath }}</code> not found
        </h3>

        <router-link class="help" :to="{ name: 'HomePage' }">
          Return to the homepage
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  name: 'NotFound',

  components: {
    NavBar,
  },
});
</script>
