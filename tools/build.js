"use strict";

const webpack = require("webpack");
const webpackConfigFactory = require("./factory");

const webpackProdConfig = webpackConfigFactory({
  isProd: true,
  iSpa: true
});

const compiler = webpack(webpackProdConfig);

compiler.run((err, stats) => {
  if (err) throw err;
  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })
  );
});
