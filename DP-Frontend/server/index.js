'use strict';

// Set default node environment to development
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Register Babel if no production mode
if (env === 'development' || env === 'test') {
  require('babel-register');
}
// Export the application
exports = module.exports = require('./app');
