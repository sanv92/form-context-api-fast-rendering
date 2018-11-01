const { cpus } = require('os')
const { resolve } = require('path')
const { NoEmitOnErrorsPlugin, EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')


const { NODE_ENV } = process.env
const IS_PROD = NODE_ENV === 'production'
const IS_DEV = NODE_ENV === 'development'
const IS_TEST = NODE_ENV === 'test'
const API_URL = NODE_ENV.API_URL || 'http://localhost:8080'

const PUBLIC = resolve(__dirname, '..', 'public')
const DIST = resolve(__dirname, '..', 'dist')
const SRC = resolve(__dirname, '..', 'src')


const config = {
  mode: NODE_ENV || 'development',
  context: SRC,
  target: 'web',

  entry: {
    polyfill: [
      '@babel/polyfill',
      'whatwg-fetch',
    ],
    vendor: ['styled-components'],
    index: ['./index'],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [SRC, 'node_modules'],
  },

  output: {
    path: DIST,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            },
          },
          {
            loader: "happypack/loader",
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
          },
        ],
      },
      {
        test:/\.css$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ],
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),

    new HappyPack({
      threads: cpus().length,
      loaders: ['babel-loader'],
    }),

    // new CommonsChunkPlugin({
    //   name: 'index',
    //   filename: IS_DEV ? '[name].js' : '[name]-[chunkhash].js',
    //   children: true,
    //   minChunks: 2,
    // }),
    //
    // new CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['index'],
    //   filename: IS_DEV ? '[name].js' : '[name]-[chunkhash].js',
    //   minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
    // }),
    //
    // new CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    // }),
    //
    // new CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity,
    // }),

    new EnvironmentPlugin({
      NODE_ENV: NODE_ENV || 'development',
      API_URL: API_URL,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${PUBLIC}/index.html`,
      chunksSortMode: (a, b) => {
        const order = ['manifest', 'vendor', 'polyfill', 'index'];

        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      },
    }),
  ],

  stats: {
    colors: true,
    children: false,
  },
}

const loadersConfig = {
  cssLoader: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]--[hash:base64:5]',
  },
}

module.exports = {
  config,
  loadersConfig,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  PUBLIC,
  DIST,
  SRC,
}
