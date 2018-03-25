const combine = require('../../../options/combine');
const gulp   = require('gulp'),
    pug    = require('gulp-pug');

let pathDev = combine.path.dev,
    pathStage = combine.path.staging;

gulp.task('pug', function() {
  gulp.src(pathDev + '/pug/*.pug')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe( gulp.dest(pathStage) );
});