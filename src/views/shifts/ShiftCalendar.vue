<template>
  <div :data-vue-component="$options.name" style="min-height: 600px;">
    <v-calendar
      v-model="dateFocus"
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      type="month"
      event-overlap-mode="stack"
      :events="events"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

// Models
import { Shift } from '@/models/Shift';

interface CalendarEvent {
  name: string;
  start: Date;
  end: Date;
  color: string;
}

export default Vue.extend({
  name: 'ShiftCalendar',

  data() {
    return {
      dateFocus: new Date(),
    };
  },

  computed: {
    ...mapGetters({
      workplaces: 'manage/workplaces/workplaces',
      shifts: 'shifts/shifts',
    }),

    events(): CalendarEvent[] {
      const shifts = this.shifts as Shift[];

      return shifts
        .filter(({ endTime }) => endTime)
        .map(({ startTime, endTime, title }) => ({
          name: title as string,
          start: new Date(startTime as number),
          end: new Date(endTime as number),
          color: 'blue',
        }));
    },
  },
});
</script>
