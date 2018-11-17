const config  = require('../../../options/config');
const gulp    = require('gulp'),
    pug       = require('gulp-pug');

let pathDev = config.paths.dev,
    pathStage = config.paths.staging;

gulp.task('pug', function() {
  return gulp.src('../../' + pathDev + '/pug/*.pug')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe( gulp.dest('../../' + pathStage) );
  });
  
gulp.task('html', function () {
    return gulp.src('../../' + pathDev + '/html/**/*.html')
    .pipe( gulp.dest('../../' + pathStage) );
});