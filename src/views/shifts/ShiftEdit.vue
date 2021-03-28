<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Update shift
        </h1>

        <shift-editor :shift="shift" @shift-saved="shiftUpdated" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters } from 'vuex';

// Models
import { Shift } from '@/models/Shift';

// Components
import ShiftEditor from './ShiftEditor.vue';

export default Vue.extend({
  name: 'ShiftEdit',

  components: {
    ShiftEditor,
  },

  props: {
    shiftId: {
      type: String as PropType<Shift['id']>,
      required: true,
    },
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

  computed: {
    ...mapGetters({ shifts: 'shifts/shifts' }),
  },

  created() {
    document.title = 'Shifts Manager - Update shift';
  },

  async mounted() {
    const shift = (this.shifts as Shift[]).find(({ id }) => id === this.shiftId);

    if (!shift) {
      await this.$buefy.dialog.alert({
        message: 'This shift does not exist',
        type: 'is-danger',
      });

      this.$router.push({ name: 'Shifts/Home' });

      return;
    }

    this.shift = shift;
  },

  methods: {
    shiftUpdated() {
      this.$buefy.toast.open({
        message: 'Shift updated successfully',
        type: 'is-success',
      });

      this.$router.push({ name: 'Shifts/Home' });
    },
  },
});
</script>
