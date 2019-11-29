"use strict";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { getResolvedPath, getHtmlPlugins, styled } = require("../utils");

const webpackPluginsFactory = (opts = {}) => {
  const { isProd, isSpa, host, port, publicPath } = opts;
  const envs = {
    PUBLIC_PATH: publicPath,
    MODE: isProd ? "prod" : "dev"
  }

  const plugins = [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), /// 在v4中设置 production mode 时已经开启
    new CopyWebpackPlugin([
      {
        from: getResolvedPath("public"),
        to: getResolvedPath("dist"),
        ignore: [".*"]
      }
    ]),
    ...getHtmlPlugins({ isProd, isSpa }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) return chunk.name;
      const hash = require("hash-sum");
      const joinedHash = hash(
        Array.from(chunk.modulesIterable, m => m.id).join("_")
      );
      return `chunk-${joinedHash}`;
    }),
    ...(isProd
      ? [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: `static/css/[name].[contenthash:8].css`
        }),
        new FriendlyErrorsWebpackPlugin()
      ]
      : [
        new webpack.HotModuleReplacementPlugin(), // 模块热更新
        new webpack.NamedModulesPlugin(), // 模块热更新
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              styled.green(`Starting server on http://${host}:${port}`)
            ]
          },
          clearConsole: true
        })
      ]),
    new webpack.EnvironmentPlugin(envs),
    new webpack.DefinePlugin(
      Object.entries(envs).reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value);
        return acc;
      }, {})
    )
  ];
  return plugins;
};

module.exports = webpackPluginsFactory;
