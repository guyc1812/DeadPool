import open from 'open';
import Gulp from 'gulp';
import nodemon from 'nodemon';
import {onServerLog, whenServerReady} from '../utils-function';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const path = require('path');
const paths = require('../pathHelpers').paths;
const serverPath = require('../pathHelpers').serverPath;
const serverPathABS = require('../pathHelpers').serverPathABS;
const argv = require('yargs').argv;

let config;

Gulp.task('start:client', cb => {
  whenServerReady(() => {
    open(`http://localhost:${config.browserSyncPort}`);
    cb();
  });
});

Gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.API_ENDPOINT = process.env.API_ENDPOINT || '';
  config = require(path.join(serverPathABS, '/config/environment'));
  // pass dynamic environment file into commandline
  let envArgs = '';
  if (argv.env) envArgs = `--env ${argv.env}`;
  nodemon(`${serverPathABS} ${envArgs}`).on('log', onServerLog);
});

Gulp.task('start:server:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  process.env.API_ENDPOINT = process.env.API_ENDPOINT || '';
  config = require(path.join(paths.dist, serverPath, '/config/environment'));
  nodemon(path.join(paths.dist, serverPath)).on('log', onServerLog);
});

// This is for angular-ssr, node dist/server-ssr/server.js
Gulp.task('start:server:ssr', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  process.env.API_ENDPOINT = process.env.API_ENDPOINT || '';
  config = require(path.join(paths.dist, serverPath, '/config/environment'));
  nodemon(path.join(paths.dist, 'server-ssr/server.js')).on('log', onServerLog);
});

Gulp.task('start:inspector', () => {
  Gulp.src([])
    .pipe(plugins.nodeInspector({
      debugPort: 5858
    }));
});

Gulp.task('start:server:debug', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(path.join(serverPathABS, '/config/environment'));
  nodemon(`-w ${serverPathABS} --debug=5858 --debug-brk ${serverPathABS}`)
    .on('log', onServerLog);
});
