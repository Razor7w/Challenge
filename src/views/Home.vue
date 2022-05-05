<template>
  <div >
    <v-container>
      <v-row
        v-if="tab < 1"
        no-gutters
        style="height: 150px;"
      >
        <v-col
          align-self="center"
        >
          <v-card>
            <v-card-title class="text-h5 font-weight-regular blue-grey white--text">
              Perfil
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="profile"
                :hint="!isEditing ? 'Click en el icono para editar' : 'Click en el icono para guardar'"
                :readonly="!isEditing"
                persistent-hint
                prepend-icon="mdi-account"
              >
                <template v-slot:append-outer>
                  <v-slide-x-reverse-transition
                    mode="out-in"
                  >
                    <v-icon
                      :key="`icon-${isEditing}`"
                      :color="isEditing ? 'success' : 'info'"
                      @click="saveProfile"
                      v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                    ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-card>
      <v-tabs
        v-model="tab"
        color = "white"
        background-color="blue-grey"
      >
        <v-tab
          v-for="item in items"
          :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.tab"
        >
          <converter v-if="item.id === 1"/>
          <history v-else/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'
import { getModule } from 'vuex-module-decorators'
import MindicadorModule from '@/store/modules/mindicador'

@Component
export default class Home extends Mixins(Utils) {
  mindicadorInstance = getModule(MindicadorModule, this.$store)
  isEditing = false
  profile = ''

  tab = 0
  items = [
    { id: 1, tab: 'Conversor' },
    { id: 2, tab: 'Historial' }
  ]

  @Watch('tab')
  updateTab (payload: number): void {
    if (payload === 1) {
      // Load table
      this.mindicadorInstance.loadTableHistory()
      // Clear inputs
      this.mindicadorInstance.setActualSourceCurrency(0)
      this.mindicadorInstance.setConversionAmount(0)
      this.mindicadorInstance.setConversionDate('')
      this.mindicadorInstance.setCurrencyValue(0)
      this.mindicadorInstance.setAmount(0)
      this.mindicadorInstance.setProfile('')
    }
  }

  saveProfile (): void {
    if (this.profile.length <= 3 && this.isEditing) {
      this.errorAlert('Debe ingresar un nombre más largo.')
    } else {
      this.isEditing = !this.isEditing
      this.mindicadorInstance.setProfile(this.profile)
    }
  }
}
</script>
