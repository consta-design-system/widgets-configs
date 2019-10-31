const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
require('jest-enzyme')
require('jest-extended')

Enzyme.configure({ adapter: new Adapter() })

global.React = require('react')
