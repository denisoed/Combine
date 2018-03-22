const gulp   = require('gulp'),
    pug    = require('gulp-pug');

let pathDev = '../../dev',
    pathStage = '../../staging';

gulp.task('pug', function() {
  gulp.src(pathDev + '/pug/*.pug')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe( gulp.dest(pathStage) );
});