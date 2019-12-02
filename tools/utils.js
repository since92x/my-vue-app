"use strict";
const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getResolvedPath = src => path.resolve(process.cwd(), src);

const getEntries = ({ isSpa }) => {
  if (isSpa) {
    return {
      app: [getResolvedPath("src/main.js")]
    };
  }
  const pageMap = glob
    .sync(getResolvedPath("src/pages/*/*.js"))
    .reduce((fileMap, file) => {
      fileMap[path.basename(file, path.extname(file))] = file;
      return fileMap;
    }, {});
  return pageMap;
};

const getHtmlPlugins = ({ isProd, isSpa }) => {
  const pluginList = glob
    .sync(getResolvedPath(isSpa ? "public/index.html" : "src/pages/*/*.html"))
    .map(filePath => {
      return new HtmlWebpackPlugin({
        cache: !isProd,
        template: filePath,
        filename: path.basename(filePath),
        chunks: isSpa ? 'all' : [
          "manifest",
          "chunk-verdors",
          "chunk-common",
          isSpa ? "app" : path.basename(filePath, path.extname(filePath))
        ],
        minify: {
          removeComments: isProd,
          collapseWhitespace: isProd,
          removeAttributeQuotes: isProd,
          collapseBooleanAttributes: isProd,
          removeScriptTypeAttributes: isProd,
          removeRedundantAttributes: isProd,
          useShortDoctype: isProd,
          removeEmptyAttributes: isProd,
          removeStyleLinkTypeAttributes: isProd,
          keepClosingSlash: isProd,
          minifyJS: isProd,
          minifyCSS: isProd,
          minifyURLs: isProd,
        },
        hash: false,
        inject: true,
        compile: true,
        favicon: false,
        showErrors: true,
        chunksSortMode: 'auto',
        xhtml: false
      });
    });
  return pluginList;
};

const styled = new Proxy(
  {
    red: ["31", "39"],
    green: ["32", "39"],
    yellow: ["33", "39"],
    blue: ["34", "39"],
    cyan: ["36", "39"]
  },
  {
    get(target, key, receiver) {
      const [color, bg] = Reflect.get(target, key, receiver) || ["36", "39"];
      return raw => `\x1B[${color}m${raw}\x1B[${bg}m`;
    }
  }
);

module.exports = {
  getResolvedPath,
  getEntries,
  getHtmlPlugins,
  styled
};
