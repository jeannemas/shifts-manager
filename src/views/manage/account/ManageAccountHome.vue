<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-narrow">
          <nav class="panel mx-3">
            <p class="panel-heading">
              {{ $t('VIEWS.MANAGE.ACCOUNT.PAGE_TITLE') }}
            </p>

            <router-link class="panel-block" :to="{ path: './profile' }">
              {{ $t('VIEWS.MANAGE.ACCOUNT.PAGES.PROFILE.HEADER') }}
            </router-link>

            <router-link class="panel-block" :to="{ path: './security' }">
              {{ $t('VIEWS.MANAGE.ACCOUNT.PAGES.SECURITY.HEADER') }}
            </router-link>
          </nav>
        </div>

        <div class="column is-narrow">
          <v-divider vertical />
        </div>

        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ManageAccountHome',
});
</script>
