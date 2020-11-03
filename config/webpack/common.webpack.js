const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const tsConfig = require('../../tsconfig.json')
const files = require('./files')
const babelConfig = require('./babel')
const { css } = require('./css')

const isProduction = process.env.NODE_ENV === 'production'
const root = path.resolve(process.env.ROOT_PATH)

module.exports = ({ withDocgen, isLibBuilding } = {}) => ({
  mode: isProduction ? 'production' : 'development',

  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
  },

  module: {
    rules: [
      ...css(),
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [{
          loader: require.resolve('source-map-loader'),
        }],
      },
      {
        exclude: /node_modules/,
        test: files.js,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              ...babelConfig,

              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: isProduction,
              compact: isProduction,
            },
          },
          withDocgen && {
            loader: require.resolve('react-docgen-typescript-loader'),
            options: {
              compilerOptions: {
                ...tsConfig.compilerOptions,
                strict: false, // чтобы не добавлялось "| undefined" у опциональных пропсов
              },
              shouldExtractLiteralValuesFromEnum: true,
            },
          },
          {
            loader: require.resolve('ts-loader'),
            options: {
              compilerOptions: {
                ...(isLibBuilding
                  ? {
                    ...tsConfig.compilerOptions,
                    moduleResolution: 'node',
                    incremental: !isProduction,
                    skipLibCheck: !isProduction,
                    typeRoots: ['node_modules/@types'],
                  }
                  : {}),
                module: 'esnext',
              },
              transpileOnly: !isLibBuilding,
              compiler: 'ttypescript',
              context: root,
            },
          },
        ].filter(Boolean),
      },
      {
        test: /\.geojson$/,
        use: [{
          loader: require.resolve('json-loader'),
        }],
      },
      {
        test: files.fonts,
        use: [
          {
            loader: require.resolve('file-loader'),
            query: {
              name: `assets/fonts/[name]${isProduction ? '.[hash]' : ''}.[ext]`,
            },
          },
        ],
      },
      {
        test: files.images,
        use: [
          {
            loader: require.resolve('file-loader'),
            query: {
              name: `assets/img/[name].[hash].[ext]`,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [path.resolve(root, 'node_modules')],
    alias: {
      '@': path.resolve(root, 'src'),
    },
    /**
     * Отключаем настройку определения настоящего пути по symlink, из-за этой
     * настройки слинкованные модули не попадают в exclude и обрабатываются
     * повторно, и в некоторых случаях из-за размера повторно обрабатываемых
     * модулей может возникать проблема с `JavaScript heap out of memory`.
     *
     * https://webpack.js.org/configuration/resolve/#resolvesymlinks
     */
    symlinks: false,
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  plugins: [
    new webpack.ProvidePlugin({ React: 'react' }),
    new MiniCssExtractPlugin(
      isLibBuilding
        ? {
          filename: 'index.css',
        }
        : {
          chunkFilename: `assets/css/[id]${isProduction ? '.[contenthash]' : ''}.css`,
          filename: `assets/css/[name]${isProduction ? '.[contenthash]' : ''}.css`,
        }
    ),
  ],
})
