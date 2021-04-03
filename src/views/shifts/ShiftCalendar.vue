<template>
  <div :data-vue-component="$options.name">
    <div class="block">
      <div class="buttons">
        <b-button icon-left="chevron-left" @click="() => $refs.calendar.prev()" />

        <b-button icon-left="chevron-right" @click="() => $refs.calendar.next()" />
      </div>
    </div>

    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        :value="now"
        :now="now"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        type="week"
        event-overlap-mode="stack"
        :events="events"
        :event-color="getEventColor"
      />
    </v-sheet>
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
      now: ((date) =>
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
          .getDate()
          .toString()
          .padStart(2, '0')}`)(new Date()),
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
          timed: true,
        }));
    },
  },

  methods: {
    getEventColor: ({ color }: CalendarEvent) => color,
  },
});
</script>
