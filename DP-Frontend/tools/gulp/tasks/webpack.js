import Gulp from 'gulp';
import Webpack from 'webpack';
import webpack from 'webpack-stream';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpackFramework from '../../../webpack.config';
import {environmentFileChecker} from "../utils-function";

const argv = require('yargs').argv;
const plugins = gulpLoadPlugins();
const path = require('path');
const paths = require('../pathHelpers').paths;
const makeWebpackConfig = webpackFramework('angular');
const ssrWebpackConfig = webpackFramework('ssrServer');

Gulp.task('webpack:dev', function () {
  const webpackDevConfig = makeWebpackConfig({DEV: true});
  return Gulp.src(webpackDevConfig.entry.app)
    .pipe(plugins.plumber())
    .pipe(webpack(webpackDevConfig, Webpack))
    .pipe(Gulp.dest('.tmp'));
});

Gulp.task('webpack:dist', function () {
  const webpackDistConfig = makeWebpackConfig(
    Object.assign({BUILD: true}, environmentFileChecker(argv.env))
  );
  return Gulp.src(webpackDistConfig.entry.app)
    .pipe(webpack(webpackDistConfig, Webpack))
    .on('error', err => {
      console.error(err);
      this.emit('end'); // Recover from errors
    })
    .pipe(Gulp.dest(path.join(paths.dist, 'client')));
});

Gulp.task('webpack:test', function () {
  const webpackDistConfig = makeWebpackConfig(
    Object.assign({TEST: true}, environmentFileChecker(argv.env))
  );
  return Gulp.src(webpackTestConfig.entry.app)
    .pipe(webpack(webpackTestConfig))
    .pipe(Gulp.dest('.tmp'));
});

Gulp.task('webpack:e2e', function () {
  const webpackDistConfig = makeWebpackConfig(
    Object.assign({E2E: true}, environmentFileChecker(argv.env))
  );
  return Gulp.src(webpackE2eConfig.entry.app)
    .pipe(webpack(webpackE2eConfig))
    .pipe(Gulp.dest('.tmp'));
});

Gulp.task('revReplaceWebpack', function () {
  return Gulp.src([path.join(paths.dist, 'client/*.js')])
    .pipe(plugins.revReplace({manifest: Gulp.src(path.join(paths.dist, paths.client.revManifest))}))
    .pipe(Gulp.dest(path.join(paths.dist, 'client')));
});

Gulp.task('webpack:ssr', function () {
  const webpackSSRConfig = ssrWebpackConfig;
  return Gulp.src(webpackSSRConfig.entry.server)
    .pipe(webpack(webpackSSRConfig, Webpack))
    .on('error', err => {
      console.error(err);
      this.emit('end'); // Recover from errors
    })
    .pipe(Gulp.dest(path.join(paths.dist, 'server-ssr')));
});

