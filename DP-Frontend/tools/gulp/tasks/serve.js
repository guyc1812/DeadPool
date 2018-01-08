import Gulp from 'gulp';
import runSequence from 'run-sequence';

Gulp.task('serve', cb => {
  runSequence(
    [
      'clean:tmp',
      // 'lint:scripts',
      // 'env:all'
    ],
    'start:server',
    'start:client',
    'watch',
    cb
  );
});

Gulp.task('serve:ssr', cb => {
  runSequence(
    'build:ssr',
    'start:server:ssr',
    cb);
});

Gulp.task('serve:dist', cb => {
  runSequence(
    'build',
    'env:all',
    'env:prod',
    [
      'start:server:prod',
      'start:client'
    ],
    cb);
});

Gulp.task('serve:debug', cb => {
  runSequence(
    [
      'clean:tmp',
      'lint:scripts',
      'inject',
      'copy:fonts:dev',
      'env:all'
    ],
    'webpack:dev',
    'start:inspector',
    [
      'start:server:debug',
      'start:client'
    ],
    'watch',
    cb
  );
});
