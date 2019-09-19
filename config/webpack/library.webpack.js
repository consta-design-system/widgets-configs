const path = require('path')
const webpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getCommonConfig = require('./common.webpack')
const isProduction = process.env.NODE_ENV === 'production'
const rootPath = process.env.ROOT_PATH
const srcPath = path.resolve(rootPath, 'src')

const libConfig = {
  entry: [srcPath],
  optimization: isProduction
    ? {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    }
    : undefined,
  devtool: 'source-map',
  output: {
    path: path.resolve(rootPath, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  plugins: [new CleanWebpackPlugin()],
}

module.exports = webpackMerge(getCommonConfig({ isLibBuilding: true }), libConfig)
