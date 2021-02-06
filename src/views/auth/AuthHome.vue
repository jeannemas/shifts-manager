<template>
  <div :data-vue-component="$options.name">
    <nav-bar />

    <div v-if="$router.getMatchedComponents().pop().name === $options.name">
      <!-- Nothing to see here -->
    </div>

    <router-view v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  name: 'AuthHome',

  components: {
    NavBar,
  },
});
</script>
