const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getCommonConfig = require('./common.webpack')
const { cssRules } = require('./css')

const isProduction = process.env.NODE_ENV === 'production'
const root = path.resolve(process.env.ROOT_PATH)
const spinner = ora()

const clientConfig = {
  entry: [path.resolve(root, 'src', 'index.tsx')],
  name: 'client',
  output: {
    path: path.resolve(root, 'build'),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          chunks: 'all',
          enforce: true,
          name: 'main',
          test: new RegExp(`\\.${cssRules.map(rule => `(${rule.ext})`).join('|')}$`),
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html',
    }),

    new CopyWebpackPlugin([{ from: 'public', to: '' }]),
  ],
}

const developmentConfig = {
  devtool: 'inline-source-map',
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      logger: {
        error: message => spinner.fail(`${chalk.gray('｢ts｣')} ${message}`),
        warn: message => spinner.warn(`${chalk.gray('｢ts｣')} ${message}`),
        info: message => spinner.info(`${chalk.gray('｢ts｣')} ${message}`),
      },
    }),
  ],
}

const productionConfig = {
  output: {
    chunkFilename: 'assets/js/[name].[chunkhash].js',
    filename: 'assets/js/[name].[chunkhash].js',
  },
  plugins: [new CleanWebpackPlugin()],
}

module.exports = webpackMerge(
  getCommonConfig(),
  clientConfig,
  isProduction ? productionConfig : developmentConfig
)
