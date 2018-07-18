import lazypipe from 'lazypipe';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const path = require('path');
const root = require('./pathHelpers').root;
const clientPathABS = require('./pathHelpers').clientPathABS;


let lintClientScripts = lazypipe()
  .pipe(plugins.eslint, path.join(clientPathABS, '../../../.eslintrc'))
  .pipe(plugins.eslint.format);

const lintClientTestScripts = lazypipe()
  .pipe(plugins.eslint, {
    configFile: path.join(clientPathABS, '../../../.eslintrc'),
    envs: [
      'browser',
      'es6',
      'mocha'
    ]
  })
  .pipe(plugins.eslint.format);

let lintServerScripts = lazypipe()
  .pipe(plugins.eslint, path.join(clientPathABS, '../../../.eslintrc'))
  .pipe(plugins.eslint.format);

let lintServerTestScripts = lazypipe()
  .pipe(plugins.eslint, {
    configFile: path.join(clientPathABS, '../../../.eslintrc'),
    envs: [
      'node',
      'es6',
      'mocha'
    ]
  })
  .pipe(plugins.eslint.format);

let transpileServer = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel, {
    plugins: [
      'transform-class-properties',
      'transform-runtime'
    ]
  })
  .pipe(plugins.sourcemaps.write, '.');

let mocha = lazypipe()
  .pipe(plugins.mocha, {
    reporter: 'spec',
    timeout: 5000,
    require: [
      path.join(root, '/mocha.conf')
    ]
  });

let istanbul = lazypipe()
  .pipe(plugins.istanbul.writeReports)
  .pipe(plugins.istanbulEnforcer, {
    thresholds: {
      global: {
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80
      }
    },
    coverageDirectory: path.join(root, '/coverage'),             //mark
    rootDirectory: ''                                           //mark
  });

export {
  lintClientScripts,
  lintClientTestScripts,
  lintServerScripts,
  lintServerTestScripts,
  transpileServer,
  mocha,
  istanbul
};
