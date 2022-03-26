module.exports = {
  devServer: {
    progress: false
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/_variables.scss";`
      }
    }
  }
}