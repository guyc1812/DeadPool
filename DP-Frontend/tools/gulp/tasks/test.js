import Gulp from 'gulp';
import {Server as KarmaServer} from 'karma';
import runSequence from 'run-sequence';
import {protractor} from 'gulp-protractor';
import gulpLoadPlugins from 'gulp-load-plugins';
import {Instrumenter} from 'istanbul';
import del from 'del';
import mocha from 'mocha';

import {istanbul} from "../pipelines";

const plugins = gulpLoadPlugins();
const path = require('path');
const dest = Gulp.dest;
const src = Gulp.src;
const root = require('../pathHelpers').root;
const paths = require('../pathHelpers').paths;


Gulp.task('test', cb =>
  runSequence('test:server', 'test:client', cb)
);


Gulp.task('test:client', done => {
  new KarmaServer({
    configFile: paths.karma,
    singleRun: true
  }, err => {
    done(err);
    process.exit(err);
  }).start();
});

Gulp.task('test:e2e', ['server:e2e', 'webpack:e2e', 'env:all', 'env:test', 'start:server'], cb => {
  src(paths.client.e2e)
    .pipe(protractor({
      configFile: path.join(root, '/protractor.conf.js'),
    }))
    .on('error', e => {
      throw e;
    })
    .on('end', () => {
      del([`${paths.e2etmp}/!(.git*|.openshift|Procfile)**`], {dot: true})
        .then(() => {
          process.exit();
        });
    });
});

Gulp.task('test:server', cb => {
  runSequence(
    'env:all',
    'env:test',
    'mocha:unit',
    'mocha:integration',
    cb);
});

Gulp.task('test:server:coverage', cb => {
  runSequence('coverage:pre',
    'env:all',
    'env:test',
    'coverage:unit',
    'coverage:integration',
    cb);
});

Gulp.task('coverage:pre', () =>
  src(paths.server.scripts)
  // Covering files
    .pipe(plugins.istanbul({
      instrumenter: Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe(plugins.istanbul.hookRequire())
);

Gulp.task('coverage:unit', () =>
    src(paths.server.test.unit)
      .pipe(mocha())
      .pipe(istanbul())
  // Creating the reports after tests ran
);

Gulp.task('coverage:integration', () =>
    src(paths.server.test.integration)
      .pipe(mocha())
      .pipe(istanbul())
  // Creating the reports after tests ran
);

Gulp.task('mocha:unit', () =>
  src(paths.server.test.unit)
    .pipe(mocha())
);

Gulp.task('mocha:integration', () =>
  src(paths.server.test.integration)
    .pipe(mocha())
);
