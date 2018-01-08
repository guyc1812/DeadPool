import _ from 'lodash';
import Gulp from 'gulp';
import runSequence from 'run-sequence';
import {lintClientScripts, lintServerScripts, lintServerTestScripts} from "../pipelines";

const dest = Gulp.dest;
const src = Gulp.src;
const paths = require('../pathHelpers').paths;

Gulp.task('lint:scripts', cb => runSequence([
  'lint:scripts:client',
  'lint:scripts:server'
], cb));

Gulp.task('lint:scripts:client', () =>
  src(_.union(
    paths.client.scripts,
    _.map(paths.client.test, blob => `!${blob}`)
  ))
    .pipe(lintClientScripts())
);

Gulp.task('lint:scripts:server', () =>
  src(_.union(paths.server.scripts, _.map(paths.server.test, blob => `!${blob}`)))
    .pipe(lintServerScripts())
);

Gulp.task('lint:scripts:clientTest', () =>
  src(paths.client.test)
    .pipe(lintClientScripts())
);

Gulp.task('lint:scripts:serverTest', () =>
  src(paths.server.test)
    .pipe(lintServerTestScripts())
);
