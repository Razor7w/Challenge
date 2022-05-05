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
    >
      <template v-slot:[`item.date`]="{ item }">
          {{ returnFullTime(item.date) }}
      </template>
      <template v-slot:[`item.dateSelected`]="{ item }">
          {{ returDate(item.dateSelected) }}
      </template>
    </v-data-table>
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

  returnFullTime (date: Date): string {
    const finalDate = new Date(date)
    const fecha = finalDate.getDate() + '-' + (finalDate.getMonth() + 1) + '-' + finalDate.getFullYear()
    const hora = finalDate.getHours() + ':' + finalDate.getMinutes() + ':' + finalDate.getSeconds()
    return fecha + ' ' + hora
  }

  returDate (date: Date): string {
    const finalDate = new Date(date)
    const fecha = finalDate.getDate() + '-' + (finalDate.getMonth() + 1) + '-' + finalDate.getFullYear()
    return fecha
  }
}
</script>
