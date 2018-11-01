const {LoaderOptionsPlugin, EnvironmentPlugin} = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge')

const {config} = require('./shared')


module.exports = merge(config, {
  devtool: 'hidden-source-map',

  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].c.js',
    crossOriginLoading: 'anonymous',
  },

  module: {
    rules: [],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
      }),
    ],
  },

  plugins: [
    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
})
