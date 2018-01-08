'use strict';
import gulpUtil from 'gulp-util';
import through2 from 'through2';
import path from 'path';
import http from 'http';

const chalk = require('chalk');

export function flatten() {
  return through2.obj(function (file, enc, next) {
    if (!file.isDirectory()) {
      try {
        let dir = path.dirname(file.relative).split(path.sep)[0];
        let fileName = path.normalize(path.basename(file.path));
        file.path = path.join(file.base, path.join(dir, fileName));
        this.push(file);
      } catch (e) {
        this.emit('error', new Error(e));
      }
    }
    next();
  });
}

export function onServerLog(log) {
  console.log(
    gulpUtil.colors.white('[') +
    gulpUtil.colors.yellow('nodemon') +
    gulpUtil.colors.white('] ') +
    log.message
  );
}

export function checkAppReady(cb) {
  let options = {
    host: 'localhost',
    port: require(path.join(require('./pathHelpers').serverPathABS, '/config/environment')).port
  };
  http
    .get(options, () => cb(true))
    .on('error', () => cb(false));
}

// Call page until first success
export function whenServerReady(cb) {
  let serverReady = false;
  let appReadyInterval = setInterval(() =>
      checkAppReady(ready => {
        if (!ready || serverReady) {
          return;
        }
        clearInterval(appReadyInterval);
        serverReady = true;
        cb();
      }),
    1000);
}

/**
 * this is a simple function to pass environment files into webpack dev server start*
 * in the webpack config, there will be a plugin to replace the environment.ts into environment.xx.ts
 * @param env
 * @return {*|{envFile: *}|{}}
 */
export function environmentFileChecker(env) {
  const _env = env && {envFile: env} || {};
  const _envFile = _env.envFile && `.${_env.envFile}` || '';
  console
    .log(chalk.red(
      `\n\t\t environment from commandline is =====> ${JSON.stringify(_env)}\n\t\t watch out, your 'environment' should be mapped into 'environment${_envFile}.ts'\n`
    ));
  return _env;
}
