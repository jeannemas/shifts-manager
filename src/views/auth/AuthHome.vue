<template>
  <div :data-vue-component="$options.name">
    <div v-if="$router.getMatchedComponents().pop().name === $options.name">
      <!-- Nothing to see here -->
    </div>

    <router-view v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthHome',
});
</script>
