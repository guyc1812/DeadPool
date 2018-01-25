'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import shrinkRay from 'shrink-ray';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import config from './environment';

const chalk = require('chalk');
const argv = require('yargs').argv;

export default function (app) {

  let env = app.get('env');
  if (env === 'development') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }
  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }
  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));
  app.set('views', `${config.root}/server/views`);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(shrinkRay());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  if (env === 'development') {
    const _env = argv.env && {envFile: argv.env} || {};
    const _envFile = _env.envFile && `.${_env.envFile}` || '';
    console.log(chalk.red(
      `\n\t\t environment from commandline is =====> ${JSON.stringify(_env)}\n\t\t watch out, your 'environment' should be mapped into 'environment${_envFile}.ts'\n`
    ));
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.config');
    const webpackConfig = makeWebpackConfig('angular')(Object.assign({DEV: true}, _env));
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${config.port}`,
      ws: true,
      // if not choose a port, 3001 always be used on windows, mac is ok
      ui: {port: 3045},
      middleware: [
        webpackDevMiddleware(compiler, {
          noInfo: false,
          stats: {
            colors: true,
            timings: true,
            chunks: false
          }
        })
      ],
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message']
    });
    compiler.plugin('done', function (stats) {
      console.log('webpack done hook');
      if (stats.hasErrors()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000
        });
      }
      browserSync.reload();
    });
  }
  if (env === 'development') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
