<template>
  <div :data-vue-component="$options.name">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RootView',
});
</script>
