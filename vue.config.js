module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators',
    '@koumoul/vjsf'
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Test'
        return args
      })
  },
  pwa: {
    name: 'Test',
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
