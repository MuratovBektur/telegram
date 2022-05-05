const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      progress: false
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/assets/styles/_variables.scss";`
      }
    }
  }
});
