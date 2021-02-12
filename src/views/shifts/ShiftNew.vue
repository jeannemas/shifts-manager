<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Log shift
        </h1>

        <form method="POST" class="box" @submit.prevent="createNewShift">
          <b-field label="Workplace">
            <!--  -->
          </b-field>

          <div class="columns">
            <div class="column is-half">
              <b-field label="Start time">
                <b-datetimepicker
                  v-model="startTime"
                  placeholder="Click to select start time"
                  append-to-body
                />
              </b-field>
            </div>

            <div class="column is-half">
              <b-field label="End time">
                <b-datetimepicker
                  v-model="endTime"
                  placeholder="Click to select end time"
                  append-to-body
                />
              </b-field>
            </div>
          </div>

          <b-field label="Description">
            <b-input
              v-model="description"
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
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ShiftNew',

  data() {
    return {
      startTime: null,
      endTime: null,
      description: null,
    };
  },

  created() {
    document.title = 'Shifts Manager - Log shift';
  },

  methods: {
    async createNewShift() {
      //
    },
  },
});
</script>
