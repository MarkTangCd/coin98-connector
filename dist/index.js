
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./coin98-connector.cjs.production.min.js')
} else {
  module.exports = require('./coin98-connector.cjs.development.js')
}
