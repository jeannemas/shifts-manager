<template>
  <div :data-vue-component="$options.name">
    <form method="POST" @submit.prevent="removeWorkplace">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Remove workplace
          </p>

          <button class="delete" @click="() => $emit('close')" />
        </header>

        <section class="modal-card-body">
          <h1 class="title">
            {{ workplace.name }}
          </h1>

          <hr />

          <h3 class="subtitle">
            Are you sure you want to remove this workplace? <br />
            You will not be able to assign shifts to it anymore.
          </h3>
        </section>

        <footer class="modal-card-foot">
          <b-button label="Cancel" @click="$emit('close')" />

          <button
            type="submit"
            class="button is-danger"
            :class="{ 'is-loading': loading }"
            :disabled="loading"
          >
            Remove workplace
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
  name: 'ManageWorkplacesDelete',

  props: {
    workplace: {
      type: Object as PropType<RetrievableEntity<Workplace>>,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    removeWorkplace() {
      this.loading = true;

      this.$emit('remove');
    },
  },
});
</script>
