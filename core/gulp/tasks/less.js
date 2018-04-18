const combine = require('../../../options/combine');
const gulp           = require('gulp'),
	less           = require('gulp-less'),
    cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
    browserSync    = require('browser-sync'),
	notify         = require('gulp-notify'),
	autoprefixer   = require('gulp-autoprefixer');
		
let pathDev = combine.path.dev,
	pathStage = combine.path.staging;

gulp.task('less', ['styles'], function() {
	return gulp.src(pathDev + '/less/*.less')
		.pipe(less({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS()) // Comment out when debugging
		.pipe(gulp.dest(pathStage + '/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
	return gulp.src(pathDev + '/less/styles/*.less')
		.pipe(less({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(pathStage + '/css/styles'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('critical', function() {
	return gulp.src(pathDev + '/less/styles/critical/*.less')
		.pipe(less({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(pathStage + '/css/styles/critical'))
		.pipe(browserSync.reload({stream: true}))
});