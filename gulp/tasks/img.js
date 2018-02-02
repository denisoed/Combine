var gulp           = require('gulp'),
		imagemin       = require('gulp-imagemin'),
    cache          = require('gulp-cache'),
		pngquant       = require('imagemin-pngquant');

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});
