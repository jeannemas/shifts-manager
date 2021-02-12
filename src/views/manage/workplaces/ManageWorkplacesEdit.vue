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
              v-model="workplace.name"
              type="text"
              name="name"
              placeholder="Workplace name"
              required
              icon="user"
            />
          </b-field>

          <b-field label="Address">
            <b-input
              v-model="workplace.address"
              type="text"
              name="address"
              placeholder="Workplace address"
              icon="location-arrow"
            />
          </b-field>

          <b-field label="Description">
            <b-input
              v-model="workplace.description"
              type="textarea"
              placeholder="Workplace description"
              maxlength="256"
              has-counter
            />
          </b-field>
        </section>

        <footer class="modal-card-foot">
          <b-button label="Cancel" @click="() => $emit('close')" />

          <button type="submit" class="button is-primary">
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
import { Workplace } from '@/models/Workplace';

export default Vue.extend({
  name: 'ManageWorkplacesEdit',

  props: {
    workplace: {
      type: Object as PropType<Workplace>,
      required: true,
    },
  },

  methods: {
    async saveWorkplace() {
      try {
        await this.$store.dispatch('manage/workplaces/saveWorkplace', this.workplace);
      } catch (error) {
        console.error(error);

        return;
      }

      this.$buefy.toast.open({
        message: 'Workplace saved successfully',
        type: 'is-success',
      });

      this.$emit('close');
    },
  },
});
</script>
