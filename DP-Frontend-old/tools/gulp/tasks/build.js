import _ from 'lodash';
import Gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import {transpileServer} from '../pipelines';


const exec = require('child_process').exec;
const path = require('path');
const plugins = gulpLoadPlugins();
const dest = Gulp.dest;
const src = Gulp.src;
const zip = require('gulp-zip');
const paths = require('../pathHelpers').paths;
const serverPath = require('../pathHelpers').serverPath;
const distPath = paths.dist;

Gulp.task('build', cb => {
  runSequence(
    'clean',
    // 'build-images',
    // 'transpile:server',
    [
      // 'copy:extras',
      // 'copy:assets',
      'webpack:dist'
    ],
    cb);
});

Gulp.task('build:ssr', cb => {
  runSequence(
    'build',
    'build:client-ssr',
    'webpack:ssr',
    cb);
});

Gulp.task('build:ssr-only', cb => {
  runSequence(
    'build:client-ssr',
    'webpack:ssr',
    cb);
});

Gulp.task('build:hash', cb => {
  runSequence(
    'clean',
    'build-images:hash',
    'transpile:server',
    [
      'copy:extras',
      'copy:assets',
      'webpack:dist'
    ],
    'revReplaceWebpack',
    cb);
});

Gulp.task('build:zip', cb => {
  runSequence(
    'build',
    'pack-client',
    cb);
});

Gulp.task('build-images', () =>
  src(paths.client.images)
    .pipe(plugins.imagemin([
      plugins.imagemin.optipng({optimizationLevel: 5}),
      plugins.imagemin.jpegtran({progressive: true}),
      plugins.imagemin.gifsicle({interlaced: true}),
      plugins.imagemin.svgo({plugins: [{removeViewBox: false}]})
    ], {
      verbose: true
    }))
    .pipe(dest(path.join(paths.dist, '/client/assets/images')))
);

Gulp.task('build-images:hash', () =>
  src(paths.client.images)
    .pipe(plugins.imagemin([
      plugins.imagemin.optipng({optimizationLevel: 5}),
      plugins.imagemin.jpegtran({progressive: true}),
      plugins.imagemin.gifsicle({interlaced: true}),
      plugins.imagemin.svgo({plugins: [{removeViewBox: false}]})
    ], {verbose: true}))
    .pipe(plugins.rev())
    .pipe(dest(path.join(paths.dist, '/client/assets/images')))
    .pipe(plugins.rev.manifest(path.join(paths.dist, paths.client.revManifest), {
      base: path.join(paths.dist, '/client/assets'),
      merge: true
    }))
    .pipe(dest(path.join(paths.dist, '/client/assets')))
);

Gulp.task('pack-client', () =>
  src(`${distPath}/client/**/*`)
    .pipe(zip('UTRClient.zip'))
    .pipe(Gulp.dest(distPath))
);

Gulp.task('build:client-ssr', function (cb) {
  exec('npm run build:client-ssr', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

Gulp.task('transpile:server', () =>
  Gulp.src(_.union(paths.server.scripts, paths.server.json))
    .pipe(transpileServer())
    .pipe(Gulp.dest(path.join(paths.dist, serverPath)))
);
