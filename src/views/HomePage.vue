<template>
  <div :data-vue-component="$options.name">
    <nav-bar />

    <!--  -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  name: 'HomePage',

  components: {
    NavBar,
  },

  created() {
    document.title = 'Shifts Manager - Home';
  },
});
</script>
