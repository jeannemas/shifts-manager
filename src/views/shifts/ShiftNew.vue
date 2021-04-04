<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Log shift
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

  created() {
    document.title = 'Shifts Manager - Log shift';
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
        message: 'Shift added successfully',
        type: 'is-success',
      });

      this.$router.push({ name: 'Shifts/Home' });
    },
  },
});
</script>
