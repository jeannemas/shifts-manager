<template>
  <div :data-vue-component="$options.name">
    <form method="POST" class="box" @submit.prevent="saveShift">
      <b-field label="Workplace" grouped group-multiline>
        <b-select v-model="workplaceId" placeholder="None selected" expanded>
          <option v-for="(workplace, index) in workplaces" :key="index" :value="workplace.id">
            {{ workplace.name }}
          </option>
        </b-select>

        <div class="control">
          <b-button
            icon-left="times"
            :disabled="!workplaceId"
            title="Reset workplace"
            @click="() => (workplaceId = null)"
          />
        </div>
      </b-field>

      <div class="columns">
        <div class="column is-half">
          <b-field label="Start time" grouped group-multiline>
            <div class="control">
              <b-button label="Now" @click="() => (startTime = new Date())" />
            </div>

            <b-datetimepicker
              v-model="startTime"
              placeholder="Click to select start time"
              required
              icon="hourglass-start"
              append-to-body
              expanded
            />

            <div class="control">
              <b-button
                icon-left="times"
                :disabled="startTime === null"
                title="Reset start time"
                @click="() => (shift.startTime = null)"
              />
            </div>
          </b-field>
        </div>

        <div class="column is-half">
          <b-field
            label="End time"
            :message="{ 'End time must come after start time': endTimeIsInvalid }"
            :type="{ 'is-danger': endTimeIsInvalid }"
            grouped
            group-multiline
          >
            <div class="control">
              <b-button label="Now" @click="() => (endTime = new Date())" />
            </div>

            <b-datetimepicker
              v-model="endTime"
              placeholder="Click to select end time"
              icon="hourglass-end"
              append-to-body
              expanded
            />

            <div class="control">
              <b-button
                icon-left="times"
                :disabled="endTime === null"
                title="Reset end time"
                @click="() => (shift.endTime = null)"
              />
            </div>
          </b-field>
        </div>
      </div>

      <b-field label="Title">
        <b-input v-model="shift.title" type="text" placeholder="Shift title" required />
      </b-field>

      <b-field label="Description">
        <b-input
          v-model="shift.description"
          type="textarea"
          placeholder="Shift description"
          maxlength="256"
          has-counter
        />
      </b-field>

      <b-field>
        <button class="button is-primary" type="submit">
          Save shift
        </button>
      </b-field>
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapGetters } from 'vuex';
import firebase from 'firebase/app';

// Models
import { Shift } from '@/models/Shift';
import { Workplace } from '@/models/Workplace';

export default Vue.extend({
  name: 'ShiftEditor',

  props: {
    shift: {
      type: Object as PropType<Shift>,
      required: true,
    },
  },

  data() {
    return {
      workplaceId: this.shift.workplace?.id || null,
    };
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

  mounted() {
    this.$nextTick(() => {
      this.workplaceId = this.shift.workplace?.id || null;
    });
  },

  methods: {
    async saveShift() {
      try {
        if (this.shift.id) {
          // It's an update

          await this.$store.dispatch('shifts/saveShift', this.shift);
        } else {
          // It's a new shift

          await this.$store.dispatch('shifts/addShift', {
            ...this.shift,
            workplace: this.workplaceId ? this.getWorkplaceRef(this.workplaceId) : null,
          } as Shift);
        }
      } catch (error) {
        console.error(error);

        return;
      }

      this.$emit('shift-saved');
    },

    getWorkplaceRef(workplaceId: Workplace['id']) {
      return firebase
        .firestore()
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('workplaces')
        .doc(workplaceId);
    },
  },
});
</script>
