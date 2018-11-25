const init = require('../../../core/init');
const gulp           = require('gulp'),
	sass           = require('gulp-sass'),
    cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
    browserSync    = require('browser-sync'),
	notify         = require('gulp-notify'),
	autoprefixer   = require('gulp-autoprefixer');
		
let pathDev = '../../' + init.paths.root + '/dev',
	pathStage = '../../' + init.paths.root + '/staging';

gulp.task('sass', ['page-styles_sass'], function () {
	return gulp.src(pathDev + '/sass/*.sass')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS()) // Comment out when debugging
		.pipe(gulp.dest(pathStage + '/css'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('page-styles_sass', function() {
	return gulp.src(pathDev + '/sass/page-styles/*.sass')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(pathStage + '/css/styles'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('critical-styles_sass', function() {
	return gulp.src(pathDev + '/sass/critical/*.sass')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest(pathStage + '/css/critical'))
		.pipe(browserSync.reload({stream: true}));
});