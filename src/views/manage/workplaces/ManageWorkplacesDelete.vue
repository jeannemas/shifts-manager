<template>
  <div :data-vue-component="$options.name">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Remove workplace
        </p>

        <button class="delete" @click="() => $emit('close')" />
      </header>

      <section class="modal-card-body">
        <p>
          Are you sure you want to remove this workplace? <br />
          Any shifts assigned to this workplace will be unassigned.
        </p>

        <hr />

        <b-field label="Name">
          <b-input
            v-model="workplace.name"
            type="text"
            placeholder="Workplace name"
            readonly
            icon="user"
          />
        </b-field>

        <b-field label="Address">
          <b-input
            v-model="workplace.address"
            type="text"
            placeholder="Workplace address"
            readonly
            icon="location-arrow"
          />
        </b-field>

        <b-field label="Description">
          <b-input
            v-model="workplace.description"
            type="textarea"
            placeholder="Workplace description"
            readonly
          />
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <b-button label="Cancel" @click="$emit('close')" />

        <b-button type="is-danger" label="Remove workplace" @click="removeWorkplace" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

// Models
import { Workplace } from '@/models/Workplace';

export default Vue.extend({
  name: 'ManageWorkplacesDelete',

  props: {
    workplace: {
      type: Object as PropType<Workplace>,
      required: true,
    },
  },

  methods: {
    async removeWorkplace() {
      try {
        await this.$store.dispatch('manage/workplaces/removeWorkplace', this.workplace.id);
      } catch (error) {
        console.error(error);

        return;
      }

      this.$buefy.toast.open({
        message: 'Workplace removed successfully',
        type: 'is-danger',
      });

      this.$emit('close');
    },
  },
});
</script>
