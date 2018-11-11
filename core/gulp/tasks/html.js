const config = require('../../../options/config');
const gulp   = require('gulp'),
    pug    = require('gulp-pug');

let pathDev = config.paths.dev,
    pathStage = config.paths.staging;
console.log(pathStage);

gulp.task('pug', function() {
  return gulp.src('../../' + pathDev + '/pug/*.pug')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe( gulp.dest('../../' + pathStage) );
});