<template>
  <v-navigation-drawer
    v-model="inputValue"
    app
    color="primary"
    width="320"
    :src="barBg"
    absolute
    temporary
  >
    <v-list class="py-0">
      <v-list-item class="menu" style=";" @click="this.appModule.toggleDrawer">
         <v-list-item-action>
              <v-icon color="#87E600" size="32">mdi-menu</v-icon>
            </v-list-item-action>

            <v-list-item-title>Categorias</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider class="mx-3 mb-3" />
    <v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppModule from '@/store/modules/app'
import { Utils } from '@/mixins/utils'

@Component({
  name: 'AppDrawer'
})
export default class extends Mixins(Utils) {
  appModule = getModule(AppModule, this.$store)
  @Prop({ default: false }) opened: boolean | undefined
  barBg = require('@/assets/bar_bg.png');
  avatar = ''
  mobile = false
  size = 0
  sizeMobile = 42
  sizeDesktop = 70
  items = []

  get inputValue (): boolean {
    return this.appModule.drawer
  }

  set inputValue (val: boolean) {
    this.appModule.setDrawer(val)
  }

  mounted (): void {
    // Cambiar
    // console.log(this.sessionInstance.getRoles)
    this.detectMobile()
    window.addEventListener('resize', this.detectMobile)
  }

  beforeDestroy (): void {
    window.removeEventListener('resize', this.detectMobile)
  }

  detectMobile (): void {
    if (this.isMobile()) {
      this.mobile = true
      this.size = this.sizeMobile
    } else {
      this.mobile = false
      this.size = this.sizeDesktop
    }
  }
}
</script>
<style lang="stylus" scoped>
.menu
  height 64px
</style>
