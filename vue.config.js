module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: './',

  pwa: {
    name: '金庫計算機',
    appleMobileWebAppStatusBarStyle:"black"
  }
};
(config) => {
  config
      .plugin('html')
      .tap(args => {
          args[0].meta = {viewport: 'width=device-width,initial-scale=1,user-scalable=no'};
       return args;
  })
};