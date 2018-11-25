const init = require('../../../core/init');
const gulp         = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    plumber        = require('gulp-plumber'),
    coffee         = require('gulp-coffee'),
    babel          = require('gulp-babel');

let pathDev = '../../' + init.paths.root + '/dev',
    pathStage = '../../' + init.paths.root + '/staging';

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

gulp.task('plugins', function () {
    return gulp.src([
            "../../core/plugins/packages/ruler/index.js"
        ])
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(pathStage + '/libs'))
});
