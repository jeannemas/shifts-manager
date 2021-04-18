<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          {{ $t('VIEWS.SHIFTS.NEW.PAGE_TITLE') }}
        </h1>

        <shift-editor :shift="shift" @save="save" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import ShiftEditor from './ShiftEditor.vue';

export default Vue.extend({
  name: 'ShiftNew',

  components: {
    ShiftEditor,
  },

  data() {
    return {
      shift: {
        workplaceId: null,
        startTime: null,
        endTime: null,
        title: null,
        description: null,
      },
    };
  },

  methods: {
    async save() {
      try {
        await this.$store.dispatch('shifts/addShift', this.shift);
      } catch (error) {
        console.error(error);

        return;
      }

      this.$buefy.toast.open({
        message: this.$t('VIEWS.SHIFTS.NEW.SHIFT_ADDED_SUCCESS_MSG') as string,
        type: 'is-success',
      });

      this.$router.push({ name: 'Shifts/Home' });
    },
  },
});
</script>
