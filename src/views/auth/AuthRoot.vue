<template>
  <div :data-vue-component="$options.name">
    <nav-bar />

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  name: 'AuthRoot',

  components: {
    NavBar,
  },
});
</script>
