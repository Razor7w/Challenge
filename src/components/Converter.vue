<template>
  <v-card flat class="mt-5">
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            type="number"
            v-model="sourceCurrency"
            label="Moneda de origen (UF)"
            filled
            shaped
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Fecha"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                filled
                shaped
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
              :max="new Date().toISOString().slice(0,10)"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-btn block color="primary" @click="clear">
        Limpiar
        <v-icon
          right
          dark
        >
          mdi-delete
        </v-icon>
      </v-btn>
    </v-container>
  </v-form>
  <v-spacer />
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Monto Conversión"
            :value="mindicadorInstance.conversionAmount"
            filled
            hide-details="auto"
            disabled
            suffix="UF"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Fecha Conversión"
            :value="mindicadorInstance.conversionDate"
            filled
            hide-details="auto"
            disabled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Valor moneda"
            :value="mindicadorInstance.currencyValue"
            filled
            hide-details="auto"
            disabled
            prefix="$"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Monto"
            :value="mindicadorInstance.amount"
            filled
            hide-details="auto"
            disabled
            prefix="$"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</v-card>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import MindicadorModule from '@/store/modules/mindicador'
import { Utils } from '@/mixins/utils'

@Component
export default class Converter extends Mixins(Utils) {
  mindicadorInstance = getModule(MindicadorModule, this.$store)
  sourceCurrency = 0
  menu2 = false
  date = ''
  dateFormatted = ''

  @Watch('date')
  updateDate (): void {
    this.dateFormatted = this.formatDate(this.date)
    if (this.date !== '' && this.sourceCurrency > 0) {
      this.mindicadorInstance.setActualSourceCurrency(this.sourceCurrency)
      this.mindicadorInstance.calculateMount(this.dateFormatted)
    }
  }

  formatDate (date: string): string {
    if (!date) return ''

    const [year, month, day] = date.split('-')
    return `${day}-${month}-${year}`
  }

  clear (): void {
    this.sourceCurrency = 0
    this.date = ''
    // this.dateFormatted = ''
    this.mindicadorInstance.setActualSourceCurrency(0)
    this.mindicadorInstance.setConversionAmount(0)
    this.mindicadorInstance.setConversionDate('')
    this.mindicadorInstance.setCurrencyValue(0)
    this.mindicadorInstance.setAmount(0)
  }
}
</script>
