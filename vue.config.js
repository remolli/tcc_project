const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      // proxy: process.env.VUE_APP_NT_BASE_URL,

      // proxy: {
      //   '/NYT': {
      //     // target: process.env.VUE_APP_BASE_URL,
      //     target: 'https://api.nytimes.com/',
      //     changeOrigin: true,
      //     pathRewrite: { '^/NYT': '' },
      //   },
      //   '/NT': {
      //     // target: process.env.VUE_APP_NT_BASE_URL,
      //     target: "https://noticias-nt-api.vercel.app/",
      //     changeOrigin: true,
      //     pathRewrite: { '^/NT': '' },
      //   },
      // },
    }
  },
})