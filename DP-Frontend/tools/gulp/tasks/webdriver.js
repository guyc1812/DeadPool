import Gulp from 'gulp';
import {webdriver_update} from 'gulp-protractor';

// Downloads the selenium webdriver
Gulp.task('webdriver_update', webdriver_update);
