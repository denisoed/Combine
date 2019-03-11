const init = require('../../../core/init');

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

const pathStage = '../../' + init.paths.root + '/staging';
const pathProd = '../../' + init.paths.root + '/prod';

gulp.task('build', ['removeProd', 'clearcache', 'imagemin'], function () {
	
	let buildHtml = gulp.src(pathStage + '/**/*.html')
		.pipe(useref())
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulpif('*.js', uglify()))
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(gulpRemoveHtml())
		.pipe(gulp.dest(pathProd + '/'));

	// let buildHtmlMin = gulp.src(pathProd + '/tmp/*.html')
	// 	.pipe(htmlmin({collapseWhitespace: true}))
	// 	.pipe(gulp.dest(pathProd + '/'));
		
	let buildCssStyles = gulp.src([
		pathStage + '/css/**/*.css'
	]).pipe(gulp.dest(pathProd + '/css'));

	let buildJs = gulp.src([
		pathStage + '/js/scripts.min.js'
	]).pipe(gulp.dest(pathProd + '/js'));

	let buildFonts = gulp.src([
		pathStage + '/fonts/**/*'
	]).pipe(gulp.dest(pathProd + '/fonts'));

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

gulp.task('removeProd', function() { return del.sync(pathProd, {force: true}) });

gulp.task('clearcache', function() { return cache.clearAll(); });
