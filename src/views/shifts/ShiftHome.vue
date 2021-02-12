<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          My shifts
        </h1>

        <!--  -->
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShiftHome',

  created() {
    document.title = 'Shifts Manager - My shifts';
  },
});
</script>
