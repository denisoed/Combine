const config = require('../../../options/config');

const gulp           = require('gulp'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	cache          = require('gulp-cache'),
	pngquant       = require('imagemin-pngquant'),
	gulpif         = require('gulp-if'),
	useref         = require('gulp-useref'),
	uglify         = require('gulp-uglify'),
	fileinclude    = require('gulp-file-include'),
	minifyCss      = require('gulp-clean-css'),
	clearcache     = require('gulp-cache'),
	htmlmin        = require('gulp-htmlmin'),
	gulpRemoveHtml = require('gulp-remove-html');

let pathDev = config.paths.dev,
	pathStage = config.paths.staging,
	pathProd = config.paths.prodaction;

gulp.task('build', ['removedist', 'clearcache', 'imagemin', 'sass'], function() {
	
	let buildHtml = gulp.src(pathStage + '/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(gulpRemoveHtml())
		.pipe(gulp.dest(pathProd + '/'));

	let buildHtmlMin = gulp.src(pathProd + '/tmp/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(pathProd + '/'));
		
	let buildCssStyles = gulp.src([
		pathStage + '/css/styles.min.css'
	]).pipe(gulp.dest(pathProd + '/css'));

	let buildJs = gulp.src([
		pathStage + '/js/scripts.min.js'
	]).pipe(gulp.dest(pathProd + '/js'));

	let buildFiles = gulp.src([
		pathStage + '/.htaccess'
	]).pipe(gulp.dest(pathProd + ''));

	let buildFonts = gulp.src([
		pathStage + '/fonts/**/*'
	]).pipe(gulp.dest(pathProd + '/fonts'));

	let buildShared = gulp.src([
		pathStage + '/shared/**/*'
	]).pipe(gulp.dest(pathProd + '/shared'));

	let buildDefault = gulp.src([
		pathStage + '/shared/default/**/*'
	]).pipe(gulp.dest(pathProd + '/shared/default'));

});

gulp.task('imagemin', function() {
	return gulp.src(pathStage + '/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(pathProd + '/img'));
});

gulp.task('removedist', function() { return del.sync(pathProd, {force: true}) });

gulp.task('clearcache', function() { return cache.clearAll(); });
