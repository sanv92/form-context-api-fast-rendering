const { resolve } = require('path')
const { LoaderOptionsPlugin, EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')

const { config, DIST } = require('./shared')


module.exports = merge(config, {
  devtool: 'cheap-module-source-map',

  profile: true,

  output: {
    filename: '[name].js',
    publicPath: '/',
    path: DIST,
    pathinfo: true,
  },

  performance: {
    hints: false,
  },

  module: {
    rules: [],
  },

  plugins: [
    new LoaderOptionsPlugin({
      debug: true,
      minimize: false,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: resolve(__dirname, '..', 'public'),
    noInfo: true,
    historyApiFallback: true,
    inline: false,
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
    port: 3001,
    host: 'localhost'
    },
})
