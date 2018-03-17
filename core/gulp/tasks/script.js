const gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    babel          = require('gulp-babel');

let pathDev = '../../dev',
    pathStage = '../../stage';

gulp.task('script', function() {
	return gulp.src([
		pathDev + '/js/script.js',
		])
    .pipe(babel({
        presets: ['es2015', 'env'],
        compact: true
    }))
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(pathStage + '/js'));
});