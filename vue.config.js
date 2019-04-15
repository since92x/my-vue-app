const path = require('path');
// const glob = require('glob');
// const entries = () => {
//   const pages = {};
//   glob.sync(path.join(__dirname, './src/pages/*/*.js')).forEach(entry => {
//     const chunkName = path.basename(entry, path.extname(entry));
//     pages[chunkName] = {
//       entry: entry,
//       template: entry.replace('.js', '.html'),
//       filename: chunkName.concat('.html'),
//       chunks: ['chunk-vendors', 'chunk-common', chunkName],
//     };
//   });
//   return pages;
// };

module.exports = {
  // pages: entries(),
  // publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
  outputDir: path.resolve(__dirname, 'dist'),
  assetsDir: 'static',
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false,
  },
  devServer: {
    open: true,
    port: 3000,
    disableHostCheck: true,
    before: () => {
      console.debug('devServer before');
    },
  },
  configureWebpack: () => {
    const enhanceConfig = {
      devtool: 'source-map',
      performance: {
        hints: false
      }
    }
    return enhanceConfig
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end();
  },
};
