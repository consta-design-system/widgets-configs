const babelOptions = require('../webpack/babel')

module.exports = require('babel-jest').createTransformer(babelOptions)
