<template>
  <div :data-vue-component="$options.name">
    <form method="POST" @submit.prevent="addWorkplace">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ $t('VIEWS.MANAGE.WORKPLACES.NEW.TITLE') }}
          </p>

          <button class="delete" @click="() => $emit('close')" />
        </header>

        <section class="modal-card-body">
          <b-field :label="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.NAME.LABEL')">
            <b-input
              v-model="workplaceName"
              type="text"
              name="name"
              :placeholder="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.NAME.PLACEHOLDER')"
              required
              icon="user"
            />
          </b-field>

          <b-field :label="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.ADDRESS.LABEL')">
            <b-input
              v-model="workplaceAddress"
              type="text"
              name="address"
              :placeholder="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.ADDRESS.PLACEHOLDER')"
              icon="location-arrow"
            />
          </b-field>

          <b-field :label="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.DESCRIPTION.LABEL')">
            <b-input
              v-model="workplaceDescription"
              type="textarea"
              :placeholder="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.DESCRIPTION.PLACEHOLDER')"
              maxlength="256"
              has-counter
            />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button :label="$t('MISC.ACTIONS.CANCEL')" @click="() => $emit('close')" />

          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': loading }"
            :disabled="loading || !workplaceIsValid"
          >
            {{ $t('VIEWS.MANAGE.WORKPLACES.NEW.SAVE_WORKPLACE_BTN') }}
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Models
import { Workplace } from '@/models/Workplace';

export default Vue.extend({
  name: 'ManageWorkplacesNew',

  data() {
    return {
      /** The new workplace name */
      workplaceName: null as Workplace['name'] | null,
      /** The new workplace address, if any */
      workplaceAddress: null as Workplace['address'],
      /** The new workplace description */
      workplaceDescription: null as Workplace['description'],

      loading: false,
    };
  },

  computed: {
    /** Whether or not the new workplace is valid */
    workplaceIsValid(): boolean {
      return !!this.workplaceName;
    },
  },

  methods: {
    addWorkplace() {
      this.loading = true;

      this.$emit('add', {
        name: this.workplaceName,
        address: this.workplaceAddress,
        description: this.workplaceDescription,
      });
    },
  },
});
</script>
