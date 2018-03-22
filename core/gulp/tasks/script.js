const gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    plumber        = require('gulp-plumber'),
    babel          = require('gulp-babel');

let pathDev = '../../dev',
    pathStage = '../../staging';

gulp.task('script', function() {
	return gulp.src([
		pathDev + '/js/script.js',
        ])
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015', 'env'],
        compact: true
    }))
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(pathStage + '/js'));
});