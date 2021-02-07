<template>
  <div :data-vue-component="$options.name">
    <!-- Nothing to see here -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SignOut',

  async beforeCreate() {
    try {
      await this.$store.dispatch('auth/signout');
    } catch (error) {
      console.error(error);
    } finally {
      const returnPath = this.$route.query.r;

      if (returnPath) {
        this.$router.push({ path: returnPath.toString() });
      } else {
        this.$router.push({ name: 'HomePage' });
      }
    }
  },
});
</script>
