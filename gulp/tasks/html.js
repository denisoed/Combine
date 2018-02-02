var gulp   = require('gulp'),
    pugbem = require('gulp-pugbem'),
    pug    = require('gulp-pug');

gulp.task('pug', function() {
  gulp.src('app/*.jade')
    .pipe( pug({
        pretty: true,
	plugins: [pugbem]
      })
    )
    .pipe( gulp.dest('app') );
});
