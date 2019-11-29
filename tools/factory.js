"use strict";

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackLoadersFactory = require("./loaders");
const webpackPluginsFactory = require("./plugins");
const { getEntries, getResolvedPath } = require("./utils");

const webpackConfigFactory = (opts = {}) => {
  const DEFAULT_OPTS = {
    isSpa: true,
    isProd: true,
    publicPath: "/",
    HOST: "0.0.0.0",
    PORT: "4000"
  };
  const { isSpa, isProd, publicPath, host, port } = { ...DEFAULT_OPTS, ...opts };
  const pageMap = getEntries({ isSpa: true })
  return {
    mode: isProd ? "production" : "development",
    entry: isProd
      ? pageMap
      : Object.entries(pageMap).reduce(
        (entryMap, [entryChunkName, entryChunk]) => {
          entryMap[entryChunkName] = [
              `webpack-dev-server/client?http://${host}:${port}/`,
              "webpack/hot/dev-server"
          ].concat(entryChunk);
          return entryMap;
        },
        {}
      ),
    output: {
      path: getResolvedPath("dist"),
      publicPath: publicPath,
      ...(isProd
        ? {
          filename: "static/js/[name].[chunkhash:8].js",
          chunkFilename: "static/js/[name].[chunkhash:8].js"
        }
        : { filename: `static/js/[name].[hash:8].js` }),
      globalObject: 'this'
    },
    module: {
      rules: webpackLoadersFactory({ isSpa, isProd })
    },
    plugins: webpackPluginsFactory({ isSpa, isProd, host, port, publicPath }),
    resolve: {
      extensions: [".js", ".css", ".vue"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": getResolvedPath("src")
      }
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          exclude: /\.min\.js$/,
          cache: true,
          parallel: true,
          sourceMap: false,
          extractComments: false,
          uglifyOptions: {
            warnings: false,
            compress: {
              unused: true,
              drop_debugger: true
            },
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/,
          cssProcessorOptions: {
            safe: true,
            autoprefixer: { disable: true },
            mergeLonghand: false,
            discardComments: {
              removeAll: true
            }
          },
          canPrint: true
        })
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            name: "chunk-verdors",
            priority: -10,
            chunks: "initial"
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: "manifest"
      },
      noEmitOnErrors: true
    },
    performance: {
      hints: isProd ? 'warning' : false
    },
    devtool: "cheap-source-map"
  };
};

module.exports = webpackConfigFactory;
