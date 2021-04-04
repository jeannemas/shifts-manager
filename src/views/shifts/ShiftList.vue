<template>
  <div :data-vue-component="$options.name">
    <b-table :data="[...unfinishedShifts, ...finishedShifts]" detailed detail-key="id" narrowed>
      <b-table-column field="workplace" label="Workplace">
        <template #header>
          <b-icon icon="building" />

          <span>
            Workplace
          </span>
        </template>

        <template #default="props">
          {{ (findWorkplaceById(props.row.workplaceId) || {}).name || 'None' }}
        </template>
      </b-table-column>

      <b-table-column field="title" label="Title">
        <template #header>
          <b-icon icon="heading" />

          <span>
            Title
          </span>
        </template>

        <template #default="props">
          {{ props.row.title }}
        </template>
      </b-table-column>

      <b-table-column field="shiftLength" label="Shift length">
        <template #header>
          <b-icon icon="stopwatch" />

          <span>
            Shift length
          </span>
        </template>

        <template #default="props">
          {{ ((props.row.endTime || Date.now()) - props.row.startTime) | prettyPrintElapsedTime }}
        </template>
      </b-table-column>

      <b-table-column field="actions" width="auto">
        <template #default="props">
          <div class="buttons is-right">
            <b-button
              v-if="!props.row.endTime"
              size="is-small"
              icon-left="check"
              label="Finish now"
              @click="() => finish(props.row)"
            />

            <b-button
              size="is-small"
              icon-left="edit"
              tag="router-link"
              :to="{ name: 'Shifts/Edit', params: { shiftId: props.row.id } }"
            />

            <b-button
              size="is-small"
              icon-left="trash"
              @click="() => $store.dispatch('shifts/removeShift', props.row.id)"
            />
          </div>
        </template>
      </b-table-column>

      <template #detail="props">
        <p>
          {{ props.row.description }}
        </p>
      </template>

      <template #empty>
        <h3 class="subtitle has-text-centered">
          You do not have any finished shift
        </h3>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import prettyMs from 'pretty-ms';

// Models
import { Shift } from '@/models/Shift';
import { Workplace } from '@/models/Workplace';
import { RetrievableEntity } from '@/models/RetrievableEntity';

export default Vue.extend({
  name: 'ShiftList',

  filters: {
    prettyPrintElapsedTime: (milliseconds: number): string =>
      prettyMs(milliseconds, { verbose: true, secondsDecimalDigits: 0 }),
  },

  computed: {
    ...mapGetters({
      workplaces: 'manage/workplaces/workplaces',
      shifts: 'shifts/shifts',
    }),

    finishedShifts(): Shift[] {
      const shifts = this.shifts as RetrievableEntity<Shift>[];

      return shifts
        .filter(({ endTime }) => endTime)
        .sort(({ startTime: a }, { startTime: b }) => b - a);
    },

    unfinishedShifts(): Shift[] {
      const shifts = this.shifts as RetrievableEntity<Shift>[];

      return shifts
        .filter(({ endTime }) => !endTime)
        .sort(({ startTime: a }, { startTime: b }) => b - a);
    },
  },

  methods: {
    findWorkplaceById(workplaceId: RetrievableEntity<Workplace>['id']): Workplace | undefined {
      const workplaces = this.workplaces as RetrievableEntity<Workplace>[];

      return workplaces.find(({ id }) => id === workplaceId);
    },

    finish(shift: Shift) {
      this.$store.dispatch('shifts/saveShift', { ...shift, endTime: Date.now() });
    },
  },
});
</script>
