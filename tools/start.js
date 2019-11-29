"use strict";

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfigFactory = require("./factory");

const { HOST = "127.0.0.1", PORT = "5000" } = process.env;

const webpackDevConfig = webpackConfigFactory({
  isProd: false,
  iSpa: true,
  host: HOST,
  port: PORT
});

const compiler = webpack(webpackDevConfig);

const server = new WebpackDevServer(compiler, {
  hot: true,
  open: true,
  quiet: false,
  noInfo: true,
  contentBase: false,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: {
    errors: true
  },
  publicPath: "/",
  clientLogLevel: "warning",
  stats: { colors: true, children: false },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 // 每秒询问的文件变更的次数
  },
  before: app => {},
  proxy: {}
});

server.listen(PORT, HOST, err => {
  if (err) throw err;
});
