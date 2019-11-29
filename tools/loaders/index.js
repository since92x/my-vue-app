"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { getResolvedPath } = require("../utils");

const webpackLoadersFactory = (opts = {}) => {
  const { isProd = true } = opts;
  return [
    // eslint-loader要放到所有loader的最前面（或者将enforce属性设为pre从而将其优先级设为最高）
    {
      test: /\.(vue|js)$/,
      loader: "eslint-loader",
      include: [getResolvedPath("src")],
      exclude: /node_modules/,
      options: {
        fix: true,
        formatter: require("eslint-friendly-formatter")
      },
      enforce: "pre"
    },
    {
      test: /\.vue$/,
      loader: "vue-loader",
      options: {}
    },
    {
      test: /\.js$/,
      loader: "babel-loader",
      include: [getResolvedPath("src")],
      exclude: /node_modules/
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        "sass-loader",
        "postcss-loader"
      ],
      include: [getResolvedPath("src")],
      exclude: /node_modules/
    },
    {
      test: /\.(svg|png|jpe?g|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 4096,
            name: "static/img/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 4096,
        name: "static/media/[name].[hash:8].[ext]"
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 4096,
        name: "static/fonts/[name].[hash:8].[ext]"
      }
    }
  ];
};

module.exports = webpackLoadersFactory;
