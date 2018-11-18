const config = require('../../../options/config');
const gulp         = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    plumber        = require('gulp-plumber'),
    coffee         = require('gulp-coffee'),
    babel          = require('gulp-babel');

let pathDev = '../../' + config.paths.dev,
    pathStage = '../../' + config.paths.staging;

gulp.task('js', function() {
	return gulp.src([
		pathDev + '/js/**/*.js',
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

gulp.task('coffee', function () {
    return gulp.src([
        pathDev + '/coffee/**/*.coffee',
    ])
    .pipe(coffee({
        bare: true
    }))
    .pipe(plumber())
    .pipe(babel({
        presets: ['es2015', 'env'],
        compact: true
    }))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(pathStage + '/js'));
});