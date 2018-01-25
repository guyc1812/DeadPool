import Gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';

const paths = require('../pathHelpers').paths;

Gulp.task('clean', cb => {
  runSequence(
    'clean:tmp',
    'clean:dist',
    'clean:e2e',
    cb
  )
});
Gulp.task('clean:tmp', () => del(['.tmp/**/*'], {dot: true}));
Gulp.task('clean:dist', () => del([`${paths.dist}/!(.git*|.openshift|Procfile)**`], {dot: true}));
Gulp.task('clean:e2e', () => del([`${paths.e2eTmp}/!(.git*|.openshift|Procfile)**`], {dot: true}));
