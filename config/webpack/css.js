const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getLocalIdent } = require('css-loader/dist/utils')

const cssRules = [
  {
    ext: 'css',
    use: [],
  },
]

const isProduction = process.env.NODE_ENV === 'production'

// Use generator function for spread in arrays
function* css({ onlyGenerateTypes } = {}) {
  for (const rule of cssRules) {
    const use = [
      onlyGenerateTypes
        ? null
        : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !isProduction,
          },
        },
      !isProduction || onlyGenerateTypes ? 'css-modules-typescript-loader' : null,
      {
        loader: 'css-loader',

        options: {
          importLoaders: rule.use.length + 1,
          modules: {
            localIdentName: isProduction ? '[hash:base64:5]' : '[folder]__[local]--[hash:base64:5]',
            getLocalIdent: (context, localIdentName, localName, options) => {
              if (
                /**
                 * Все что находится в node_modules не надо обрабатывать как
                 * CSS Modules.
                 */
                context.resourcePath.includes('node_modules') ||
                /**
                 * Все что не относится к проекту где происходит сборка,
                 * например symlink модулей из соседних директорий тоже не
                 * должно обрабатываться через CSS Modules.
                 */
                !context.resourcePath.includes(context.rootContext)
              ) {
                return localName
              }

              return getLocalIdent(context, localIdentName, localName, options)
            },
          }
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [
              require('postcss-mixins')({
                mixinsFiles: path.join(process.cwd(), 'src/styles/mixins/**/*.css'),
              }),
              require('postcss-nested'),
              require('postcss-preset-env')({
                stage: 2,
                features: {
                  autoprefixer: true,
                  'custom-selectors': true,
                  'nesting-rules': false,
                },
              }),
              isProduction && require('cssnano')(),
            ].filter(Boolean)
          },
        },
      },
      ...rule.use,
    ]

    yield {
      test: new RegExp(`\\.${rule.ext}$`),
      use: use.filter(Boolean),
    }
  }
}

module.exports = {
  css,
  cssRules,
}
