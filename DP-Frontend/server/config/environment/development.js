'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://iperf-test-5287.slc07.dev.ebayc3.com/ecgqeportal-dev'
  },

  // Seed database on startup
  seedDB: true

};
