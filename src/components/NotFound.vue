<template>
  <div :data-vue-component="$options.name">
    <nav-bar />

    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-spaced">
            {{ $t('COMPONENTS.NOT_FOUND.TITLE') }}
          </h1>

          <h3 class="subtitle">
            <i18n path="COMPONENTS.NOT_FOUND.SUBTITLE">
              <template #url>
                <code>
                  {{ $route.fullPath }}
                </code>
              </template>
            </i18n>
          </h3>

          <router-link class="help" :to="{ name: 'HomePage' }">
            {{ $t('COMPONENTS.NOT_FOUND.RETURN') }}
          </router-link>
        </div>
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
