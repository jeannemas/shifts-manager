<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          My workplaces
        </h1>

        <b-button icon-left="plus" label="Add workplace" @click.prevent="addWorkplace" />

        <b-table :data="workplaces" detailed detail-key="id">
          <b-table-column field="name" label="Name">
            <template #header>
              <b-icon icon="building" />

              <span>
                Name
              </span>
            </template>

            <template #default="props">
              {{ props.row.name }}
            </template>
          </b-table-column>

          <b-table-column field="address" label="Address">
            <template #header>
              <b-icon icon="location-arrow" />

              <span>
                Address
              </span>
            </template>

            <template #default="props">
              {{ props.row.address }}
            </template>
          </b-table-column>

          <template #detail="props">
            <div class="columns">
              <div class="column">
                <p>
                  {{ props.row.description }}
                </p>
              </div>

              <div class="column is-narrow">
                <div class="buttons">
                  <b-button icon-left="edit" @click="() => editWorkplace(props.row)" />

                  <b-button icon-left="trash" @click="() => removeWorkplace(props.row)" />
                </div>
              </div>
            </div>
          </template>

          <template #empty>
            <h3 class="subtitle has-text-centered">
              You do not have any workplace
            </h3>
          </template>
        </b-table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

// Models
import { Workplace } from '@/models/Workplace';

// Components
import NewWorkplace from './ManageWorkplacesNew.vue';
import EditWorkplace from './ManageWorkplacesEdit.vue';
import RemoveWorkplace from './ManageWorkplacesDelete.vue';

export default Vue.extend({
  name: 'ManageWorkplacesHome',

  computed: {
    ...mapGetters({ workplaces: 'manage/workplaces/workplaces' }),
  },

  created() {
    document.title = `Shift Manager - My workplaces`;
  },

  methods: {
    async addWorkplace() {
      this.$buefy.modal.open({
        parent: this,
        component: NewWorkplace,
        hasModalCard: true,
        trapFocus: true,
      });
    },

    async editWorkplace(workplace: Workplace) {
      this.$buefy.modal.open({
        parent: this,
        component: EditWorkplace,
        props: { workplace },
        hasModalCard: true,
        trapFocus: true,
      });
    },

    async removeWorkplace(workplace: Workplace) {
      this.$buefy.modal.open({
        parent: this,
        component: RemoveWorkplace,
        props: { workplace },
        hasModalCard: true,
        trapFocus: true,
      });
    },
  },
});
</script>
