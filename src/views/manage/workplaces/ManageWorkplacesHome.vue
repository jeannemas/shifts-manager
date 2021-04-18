<template>
  <div :data-vue-component="$options.name">
    <section class="section">
      <div class="container">
        <h1 class="title">
          {{ $t('VIEWS.MANAGE.WORKPLACES.PAGE_TITLE') }}
        </h1>

        <div class="block">
          <b-button
            icon-left="plus"
            :label="$t('VIEWS.MANAGE.WORKPLACES.ADD_WORKPLACE_BTN')"
            @click.prevent="addWorkplace"
          />
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
                    <b-field :label="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.ADDRESS.LABEL')">
                      {{ workplace.address || $t('MISC.NONE') }}
                    </b-field>

                    <b-field :label="$t('VIEWS.MANAGE.WORKPLACES.FIELDS.DESCRIPTION.LABEL')">
                      {{ workplace.description || $t('MISC.NONE') }}
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
                      {{ $t('MISC.ACTIONS.EDIT') }}
                    </span>
                  </a>

                  <a
                    href="#"
                    class="card-footer-item"
                    @click.prevent="() => removeWorkplace(workplace)"
                  >
                    <b-icon icon="trash" />

                    <span>
                      {{ $t('MISC.ACTIONS.DELETE') }}
                    </span>
                  </a>
                </footer>
              </div>
            </div>
          </div>

          <div v-else>
            <h3 class="subtitle has-text-centered">
              {{ $t('VIEWS.MANAGE.WORKPLACES.NO_WOKPLACES_MSG') }}
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
import { RetrievableEntity } from '@/models/RetrievableEntity';
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
              message: this.$t('VIEWS.MANAGE.WORKPLACES.WORKPLACE_ADDED_SUCCESS_MSG') as string,
              type: 'is-success',
            });

            modal.close();
          },
        },
      });
    },

    editWorkplace(workplace: RetrievableEntity<Workplace>) {
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
              message: this.$t('VIEWS.MANAGE.WORKPLACES.WORKPLACE_SAVED_SUCCESS_MSG') as string,
              type: 'is-success',
            });

            modal.close();
          },
        },
      });
    },

    removeWorkplace(workplace: RetrievableEntity<Workplace>) {
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
              message: this.$t('VIEWS.MANAGE.WORKPLACES.WORKPLACE_REMOVED_SUCCESS_MSG') as string,
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
