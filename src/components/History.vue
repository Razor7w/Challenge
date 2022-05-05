<template>
  <v-card flat>
    <v-card-title>
      Historial de consultas
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="mindicadorInstance.history"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import MindicadorModule from '@/store/modules/mindicador'

@Component
export default class History extends Vue {
  mindicadorInstance = getModule(MindicadorModule, this.$store)
  search = ''
  headers = [
    {
      text: 'Fecha y hora de la actividad',
      align: 'start',
      sortable: false,
      value: 'date'
    },
    { text: 'Usuario de la solicitud', value: 'user' },
    { text: 'Monto de origen', value: 'amount' },
    { text: 'Fecha conversión', value: 'dateSelected' },
    { text: 'Valor de la moneda', value: 'currencyValue' },
    { text: 'Monto de la conversión', value: 'conversionAmount' }
  ]
}
</script>
