import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import AppModule from '@/store/modules/app'
import MindicadorModule from '@/store/modules/mindicador'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['SessionModule']
})

export default new Vuex.Store({
  modules: {
    AppModule,
    MindicadorModule
  },
  plugins: [vuexLocal.plugin]
})
