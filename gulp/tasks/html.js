var gulp   = require('gulp'),
    pug    = require('gulp-pug');

gulp.task('pug', function() {
  gulp.src('dev/pug/*.pug')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe( gulp.dest('stage') );
});
