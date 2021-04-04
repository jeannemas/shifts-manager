<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          My workplaces
        </h1>

        <div class="block">
          <b-button icon-left="plus" label="Add workplace" @click.prevent="addWorkplace" />
        </div>

        <div class="block">
          <div v-if="workplaces.length" class="columns is-multiline">
            <div v-for="(workplace, index) in workplaces" :key="index" class="column is-4">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    {{ workplace.name }}
                  </p>
                </header>

                <div class="card-content">
                  <div class="content">
                    <b-field label="Address">
                      {{ workplace.address || 'None' }}
                    </b-field>

                    <b-field label="Description">
                      {{ workplace.description || 'None' }}
                    </b-field>
                  </div>
                </div>

                <footer class="card-footer">
                  <a
                    href="#"
                    class="card-footer-item"
                    @click.prevent="() => editWorkplace(workplace)"
                  >
                    <b-icon icon="edit" />

                    <span>
                      Edit
                    </span>
                  </a>

                  <a
                    href="#"
                    class="card-footer-item"
                    @click.prevent="() => removeWorkplace(workplace)"
                  >
                    <b-icon icon="trash" />

                    <span>
                      Delete
                    </span>
                  </a>
                </footer>
              </div>
            </div>
          </div>

          <div v-else>
            <h3 class="subtitle has-text-centered">
              You do not have any workplace
            </h3>
          </div>
        </div>
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
    addWorkplace() {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: NewWorkplace,
        hasModalCard: true,
        trapFocus: true,
        events: {
          add: async ({ name, address, description }: Workplace) => {
            try {
              await this.$store.dispatch('manage/workplaces/addWorkplace', {
                name,
                address,
                description,
              });
            } catch (error) {
              console.error(error);

              modal.$data.loading = false;

              return;
            }

            this.$buefy.toast.open({
              message: 'Workplace added successfully',
              type: 'is-success',
            });

            modal.close();
          },
        },
      });
    },

    editWorkplace(workplace: Workplace) {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: EditWorkplace,
        props: { workplace },
        hasModalCard: true,
        trapFocus: true,
        events: {
          save: async ({ name, address, description }: Workplace) => {
            try {
              await this.$store.dispatch('manage/workplaces/saveWorkplace', {
                id: workplace.id,
                name,
                address,
                description,
              });
            } catch (error) {
              console.error(error);

              modal.$data.loading = false;

              return;
            }

            this.$buefy.toast.open({
              message: 'Workplace saved successfully',
              type: 'is-success',
            });

            modal.close();
          },
        },
      });
    },

    removeWorkplace(workplace: Workplace) {
      const modal = this.$buefy.modal.open({
        parent: this,
        component: RemoveWorkplace,
        props: { workplace },
        hasModalCard: true,
        trapFocus: true,
        events: {
          remove: async () => {
            try {
              await this.$store.dispatch('manage/workplaces/removeWorkplace', workplace.id);
            } catch (error) {
              console.error(error);

              modal.$data.loading = false;

              return;
            }

            this.$buefy.toast.open({
              message: 'Workplace removed successfully',
              type: 'is-danger',
            });

            modal.close();
          },
        },
      });
    },
  },
});
</script>
