var gulp   = require('gulp'),
    pug    = require('gulp-pug');

gulp.task('pug', function() {
  gulp.src('app/*.jade')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe( gulp.dest('app') );
});
