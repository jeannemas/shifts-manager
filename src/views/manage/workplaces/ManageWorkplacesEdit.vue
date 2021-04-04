<template>
  <div :data-vue-component="$options.name">
    <form method="POST" @submit.prevent="saveWorkplace">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Edit workplace
          </p>

          <button class="delete" @click="() => $emit('close')" />
        </header>

        <section class="modal-card-body">
          <b-field label="Name">
            <b-input
              v-model="workplaceName"
              type="text"
              name="name"
              placeholder="Workplace name"
              required
              icon="user"
            />
          </b-field>

          <b-field label="Address">
            <b-input
              v-model="workplaceAddress"
              type="text"
              name="address"
              placeholder="Workplace address"
              icon="location-arrow"
            />
          </b-field>

          <b-field label="Description">
            <b-input
              v-model="workplaceDescription"
              type="textarea"
              placeholder="Workplace description"
              maxlength="256"
              has-counter
            />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button label="Cancel" @click="() => $emit('close')" />

          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': loading }"
            :disabled="loading || !workplaceIsValid"
          >
            Save workplace
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

// Models
import { RetrievableEntity } from '@/models/RetrievableEntity';
import { Workplace } from '@/models/Workplace';

export default Vue.extend({
  name: 'ManageWorkplacesEdit',

  props: {
    workplace: {
      type: Object as PropType<RetrievableEntity<Workplace>>,
      required: true,
    },
  },

  data() {
    return {
      /** The workplace name */
      workplaceName: this.workplace.name,
      /** The workplace address, if any */
      workplaceAddress: this.workplace.address,
      /** The workplace description */
      workplaceDescription: this.workplace.description,

      loading: false,
    };
  },

  computed: {
    workplaceIsValid(): boolean {
      return !!this.workplaceName;
    },
  },

  methods: {
    saveWorkplace() {
      this.loading = true;

      this.$emit('save', {
        name: this.workplaceName,
        address: this.workplaceAddress,
        description: this.workplaceDescription,
      });
    },
  },
});
</script>
