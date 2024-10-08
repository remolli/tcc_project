const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all', // Divide tanto os chunks síncronos quanto os assíncronos
      },
    },
  },
})