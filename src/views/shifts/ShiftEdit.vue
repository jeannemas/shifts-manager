<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Update shift
        </h1>

        <shift-editor v-if="shift" :shift="shift" @save="save" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters } from 'vuex';

// Models
import { Shift } from '@/models/Shift';
import { RetrievableEntity } from '@/models/RetrievableEntity';

// Components
import ShiftEditor from './ShiftEditor.vue';

export default Vue.extend({
  name: 'ShiftEdit',

  components: {
    ShiftEditor,
  },

  props: {
    shiftId: {
      type: String as PropType<RetrievableEntity<Shift>['id']>,
      required: true,
    },
  },

  data() {
    return {
      shift: null as RetrievableEntity<Shift> | null,
    };
  },

  computed: {
    ...mapGetters({ shifts: 'shifts/shifts' }),
  },

  created() {
    document.title = 'Shifts Manager - Update shift';
  },

  async mounted() {
    const shifts = this.shifts as RetrievableEntity<Shift>[];
    const shift = shifts.find(({ id }) => id === this.shiftId);

    if (!shift) {
      this.$buefy.dialog.alert({
        message: 'This shift does not exist',
        type: 'is-danger',
      });

      this.$router.push({ name: 'Shifts/Home' });

      return;
    }

    this.shift = shift;
  },

  methods: {
    async save() {
      try {
        await this.$store.dispatch('shifts/saveShift', this.shift);
      } catch (error) {
        console.error(error);

        return;
      }

      this.$buefy.toast.open({
        message: 'Shift updated successfully',
        type: 'is-success',
      });

      this.$router.push({ name: 'Shifts/Home' });
    },
  },
});
</script>
