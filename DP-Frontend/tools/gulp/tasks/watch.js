import Gulp from 'gulp';
import _ from 'lodash';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const path = require('path');
const root = require('../pathHelpers').root;
const paths = require('../pathHelpers').paths;

const lintServerScripts = require('../pipelines').lintServerScripts;
const lintServerTestScripts = require('../pipelines').lintServerTestScripts;

Gulp.task('watch', () => {
  let testFiles = _.union(
    path.join(root, paths.client.test[0]),
    paths.server.test.unit,
    paths.server.test.integration);

  plugins.watch(_.union(paths.server.scripts, testFiles))
    .pipe(plugins.plumber())
    .pipe(lintServerScripts());

  plugins.watch(_.union(paths.server.test.unit, paths.server.test.integration))
    .pipe(plugins.plumber())
    .pipe(lintServerTestScripts());
});
