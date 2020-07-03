const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    [
      require('@babel/preset-env').default,
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Transform modules to CJS only for jest
        modules: isTest ? 'cjs' : false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      require('@babel/preset-react').default,
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: !isProduction,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [
    [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
    [
      require('@babel/plugin-proposal-object-rest-spread').default,
      {
        useBuiltIns: true,
      },
    ],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: true,
        regenerator: true,
      },
    ],
    [
      require('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
          },
        },
      },
    ],
    ...(isProduction
      ? [
        // Treat React JSX elements as value types and hoist them to the highest scope
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
        require('@babel/plugin-transform-react-constant-elements').default,

        // Replaces the React.createElement function with one that is more optimized for production
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
        require('@babel/plugin-transform-react-inline-elements').default,

        // Remove unnecessary React propTypes from the production build
        // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
        [
          require('babel-plugin-transform-react-remove-prop-types').default,
          {
            removeImport: true,
          },
        ],
      ]
      : [require('react-hot-loader/babel')]),
  ],
}
