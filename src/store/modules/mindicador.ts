import { ApiMindicador } from './api-mindicador'
import { ApiHistory } from './api-history'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'MindicadorModule',
  stateFactory: true
})
export default class MindicadorModule extends VuexModule {
  actualSourceCurrency = 0
  conversionAmount = 0
  conversionDate = ''
  currencyValue = 0
  amount = 0
  profile = ''
  tab = 0
  history = []

  @Mutation
  setActualSourceCurrency (payload: number): void {
    this.actualSourceCurrency = payload
  }

  @Mutation
  setConversionAmount (payload: number): void {
    this.conversionAmount = payload
  }

  @Mutation
  setConversionDate (payload: string): void {
    this.conversionDate = payload
  }

  @Mutation
  setCurrencyValue (payload: number): void {
    this.currencyValue = payload
  }

  @Mutation
  setAmount (payload: number): void {
    this.amount = payload
  }

  @Mutation
  setProfile (payload: string): void {
    this.profile = payload
  }

  @Mutation
  setTab (payload: number): void {
    this.tab = payload
  }

  @Mutation
  setHistory (payload: []): void {
    this.history = payload
  }

  @Action
  calculateMount (payload: string): void {
    ApiMindicador.get(payload)
      .then(response => {
        // console.log(response.data.serie[0].valor)
        this.context.commit('setConversionAmount', this.actualSourceCurrency)
        this.context.commit('setConversionDate', payload)
        this.context.commit('setCurrencyValue', response.data.serie[0].valor)
        // Valor UF por api => response.data.serie[0].valor
        this.context.commit('setAmount', Math.round(response.data.serie[0].valor * this.actualSourceCurrency))
        const hoy = new Date()
        const fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear()
        const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
        const fechaYHora = fecha + ' ' + hora
        ApiHistory.post('', {
          date: fechaYHora,
          user: this.profile,
          amount: this.actualSourceCurrency,
          dateSelected: payload,
          currencyValue: this.currencyValue,
          conversionAmount: this.amount
        })
          .then(() => {
            // console.log(response)
          })
      })
      .catch(error => {
        console.log(error.message)
      })
      .finally(() => {
        //
      })
  }

  @Action
  loadTableHistory (): void {
    ApiHistory.get('')
      .then(response => {
        // console.log(response.data)
        this.context.commit('setHistory', response.data)
      })
  }
}
