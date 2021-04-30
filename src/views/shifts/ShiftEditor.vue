<template>
  <div :data-vue-component="$options.name">
    <form method="POST" class="box" @submit.prevent="() => $emit('save', shift)">
      <b-field :label="$t('ENTITIES.SHIFT.WORKPLACE.LABEL')">
        <b-select
          v-model="shift.workplaceId"
          :placeholder="$t('VIEWS.SHIFTS.EDITOR.NO_WORKPLACE_SELECTED')"
          expanded
        >
          <option :value="null">
            {{ $t('VIEWS.SHIFTS.EDITOR.NO_WORKPLACE_SELECTED') }}
          </option>

          <option v-for="(workplace, index) in workplaces" :key="index" :value="workplace.id">
            {{ workplace.name }}
          </option>
        </b-select>
      </b-field>

      <div class="columns">
        <div class="column is-half">
          <b-field :label="$t('ENTITIES.SHIFT.START_TIME.LABEL')" grouped group-multiline>
            <div class="control">
              <b-button :label="$t('MISC.NOW')" @click="() => (startTime = new Date())" />
            </div>

            <b-datetimepicker
              v-model="startTime"
              :placeholder="$t('ENTITIES.SHIFT.START_TIME.PLACEHOLDER')"
              required
              icon="hourglass-start"
              append-to-body
              expanded
            />

            <div class="control">
              <b-button
                icon-left="times"
                :disabled="startTime === null"
                :title="$t('ENTITIES.SHIFT.START_TIME.RESET')"
                @click="() => (shift.startTime = null)"
              />
            </div>
          </b-field>
        </div>

        <div class="column is-half">
          <b-field
            :label="$t('ENTITIES.SHIFT.END_TIME.LABEL')"
            :message="{ [$t('ENTITIES.SHIFT.END_TIME.VALIDATION_MSG')]: endTimeIsInvalid }"
            :type="{ 'is-danger': endTimeIsInvalid }"
            grouped
            group-multiline
          >
            <div class="control">
              <b-button :label="$t('MISC.NOW')" @click="() => (endTime = new Date())" />
            </div>

            <b-datetimepicker
              v-model="endTime"
              :placeholder="$t('ENTITIES.SHIFT.END_TIME.PLACEHOLDER')"
              icon="hourglass-end"
              append-to-body
              expanded
            />

            <div class="control">
              <b-button
                icon-left="times"
                :disabled="endTime === null"
                :title="$t('ENTITIES.SHIFT.END_TIME.RESET')"
                @click="() => (shift.endTime = null)"
              />
            </div>
          </b-field>
        </div>
      </div>

      <b-field :label="$t('ENTITIES.SHIFT.TITLE.LABEL')">
        <b-input
          v-model="shift.title"
          type="text"
          :placeholder="$t('ENTITIES.SHIFT.TITLE.PLACEHOLDER')"
          required
        />
      </b-field>

      <b-field :label="$t('ENTITIES.SHIFT.DESCRIPTION.LABEL')">
        <b-input
          v-model="shift.description"
          type="textarea"
          :placeholder="$t('ENTITIES.SHIFT.DESCRIPTION.PLACEHOLDER')"
          maxlength="256"
          has-counter
        />
      </b-field>

      <b-field>
        <button class="button is-primary" type="submit">
          {{ $t('VIEWS.SHIFTS.EDITOR.SAVE_SHIFT_BTN') }}
        </button>
      </b-field>
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters } from 'vuex';

// Models
import { Shift } from '@/models/Shift';

export default Vue.extend({
  name: 'ShiftEditor',

  props: {
    shift: {
      type: Object as PropType<Shift>,
      required: true,
    },
  },

  computed: {
    endTimeIsInvalid(): boolean {
      if (!this.shift.startTime || !this.shift.endTime) {
        return false;
      }

      return this.shift.startTime > this.shift.endTime;
    },

    startTime: {
      get(): Date | null {
        return this.shift.startTime ? new Date(this.shift.startTime) : null;
      },

      set(value: Date) {
        this.shift.startTime = value.getTime();
      },
    },

    endTime: {
      get(): Date | null {
        return this.shift.endTime ? new Date(this.shift.endTime) : null;
      },

      set(value: Date) {
        this.shift.endTime = value.getTime();
      },
    },

    ...mapGetters({
      workplaces: 'manage/workplaces/workplaces',
      currentUser: 'auth/currentUser',
    }),
  },
});
</script>
