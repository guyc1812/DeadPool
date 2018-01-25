import Gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const serverPath = require('../pathHelpers').serverPath;
const plugins = gulpLoadPlugins();

Gulp.task('env:all', () => {
  let localConfig;
  try {
    localConfig = require(`./${serverPath}/config/local.env`);
  } catch (e) {
    localConfig = {};
  }
  plugins.env({
    vars: localConfig
  });
});

Gulp.task('env:test', () => {
  plugins.env({
    vars: {NODE_ENV: 'test'}
  });
});

Gulp.task('env:prod', () => {
  plugins.env({
    vars: {NODE_ENV: 'production'}
  });
});
