<template>
  <div :data-vue-component="$options.name">
    <form method="POST" @submit.prevent="addWorkplace">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Add workplace
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
import Vue from 'vue';

// Models
import { Workplace } from '@/models/Workplace';

export default Vue.extend({
  name: 'ManageWorkplacesNew',

  data() {
    return {
      workplace: {
        name: null as string | null,
        address: null as string | null,
        description: null as string | null,
      } as Workplace,
    };
  },

  methods: {
    async addWorkplace() {
      try {
        await this.$store.dispatch('manage/workplaces/addWorkplace', this.workplace);
      } catch (error) {
        console.error(error);

        return;
      }

      this.$buefy.toast.open({
        message: 'Workplace added successfully',
        type: 'is-success',
      });

      this.$emit('close');
    },
  },
});
</script>
