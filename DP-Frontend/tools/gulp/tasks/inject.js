import _ from 'lodash';
import Gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const dest = Gulp.dest;
const src = Gulp.src;
const paths = require('../pathHelpers').paths;
const clientPath = require('../pathHelpers').clientPath;
const clientPathABS = require('../pathHelpers').clientPathABS;
const plugins = gulpLoadPlugins();


Gulp.task('inject:css', () =>
  src(paths.client.mainStyle)
    .pipe(plugins.inject(
      src(_.union(paths.client.styles, [`!${paths.client.mainStyle}`]), {read: false})
        .pipe(plugins.sort()),
      {
        starttag: '/* inject:css */',
        endtag: '/* endinject */',
        transform: filepath => {
          let newPath = filepath
            .replace(`/${clientPath}/app/`, '')
            .replace(`/${clientPath}/components/`, '../components/')
            .replace(/_(.*).css/, (match, p1, offset, string) => p1);
          return `@import '${newPath}';`;
        }
      }))
    .pipe(dest(`${clientPathABS}/app`))
);
