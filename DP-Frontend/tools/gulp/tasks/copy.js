import Gulp from 'gulp';
import {flatten} from '../utils-function';

const path = require('path');
const dest = Gulp.dest;
const src = Gulp.src;

const paths = require('../pathHelpers').paths;
const clientPath = require('../pathHelpers').clientPath;

Gulp.task('copy:fonts:dev', () => {
    return src('node_modules/{bootstrap,font-awesome}/fonts/*')
      .pipe(flatten())
      .pipe(dest(`${clientPath}/assets/fonts`))
  }
);

Gulp.task('copy:fonts:dist', () =>
  src('node_modules/{bootstrap,font-awesome}/fonts/*')
    .pipe(flatten())
    .pipe(dest(path.join(paths.dist, `${clientPath}/assets/fonts`)))
);

Gulp.task('copy:assets', () =>
  src([paths.client.assets, `!${paths.client.images}`])
    .pipe(dest(path.join(paths.dist, `${clientPath}/assets`)))
);

Gulp.task('copy:server', () =>
  src([
    'package.json'
  ], {cwdbase: true})
    .pipe(dest(paths.dist))
);

Gulp.task('copy:extras', () =>
  src([
    `${clientPath}/favicon.ico`,
    `${clientPath}/robots.txt`,
    `${clientPath}/.htaccess`
  ], {dot: true})
    .pipe(dest(path.join(paths.dist, clientPath)))
);

Gulp.task('copy:api:dist', () =>
  src([paths.client.api])
    .pipe(dest(path.join(paths.dist, `${clientPath}/assets/api`)))
);

Gulp.task('copy:md:dist', () =>
  src([paths.client.md])
    .pipe(dest(path.join(paths.dist, `${clientPath}/assets/md`)))
);
