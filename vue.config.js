const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

const BASE_URL = "/";

module.exports = {
  publicPath: BASE_URL,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_com", resolve("src/components"));
  }
};
