const config = require('../../../options/config');
const gulp           = require('gulp'),
	sass           = require('gulp-sass'),
    cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
    browserSync    = require('browser-sync'),
	notify         = require('gulp-notify'),
	autoprefixer   = require('gulp-autoprefixer');
		
let pathDev = '../../' + config.paths.dev,
	pathStage = '../../' + config.paths.staging;

gulp.task('scss', ['page-styles_scss'], function() {
	return gulp.src(pathDev + '/scss/*.scss')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS()) // Comment out when debugging
		.pipe(gulp.dest(pathStage + '/css'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('page-styles_scss', function () {
	return gulp.src(pathDev + '/scss/page-styles/*.scss')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(pathStage + '/css/styles'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('critical-styles_scss', function() {
	return gulp.src(pathDev + '/scss/critical/*.scss')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(pathStage + '/css/critical'))
		.pipe(browserSync.reload({stream: true}));
});