<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Log shift
        </h1>

        <shift-editor :shift="shift" @shift-saved="shiftCreated" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// Models
import { Shift } from '@/models/Shift';

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
        id: null,
        workplace: null,
        startTime: null,
        endTime: null,
        title: null,
        description: null,
      } as Shift,
    };
  },

  created() {
    document.title = 'Shifts Manager - Log shift';
  },

  methods: {
    shiftCreated() {
      this.$buefy.toast.open({
        message: 'Shift added successfully',
        type: 'is-success',
      });

      this.$router.push({ name: 'Shifts/Home' });
    },
  },
});
</script>
