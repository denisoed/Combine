const gulp           = require('gulp'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	cache          = require('gulp-cache'),
	pngquant       = require('imagemin-pngquant'),
	gulpif         = require('gulp-if'),
	useref         = require('gulp-useref'),
	uglify         = require('gulp-uglify'),
	fileinclude = require('gulp-file-include'),
	gulpRemoveHtml = require('gulp-remove-html');

let pathDev = '../../dev',
	pathStage = '../../staging',
	pathProd = '../../prod';

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass'], function() {

	let buildLibs = gulp.src(pathStage + '/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest(pathStage + '/'));

	let buildCssLibs = gulp.src([
		pathStage + '/css/libs.min.css'
	]).pipe(gulp.dest(pathProd + '/css'));

	let buildCssBase = gulp.src([
		pathStage + '/css/base.min.css'
	]).pipe(gulp.dest(pathProd + '/css'));

	let buildCssStyles = gulp.src([
		pathStage + '/css/styles/*.css'
	]).pipe(gulp.dest(pathProd + '/css/styles'));

	let buildFiles = gulp.src([
		pathStage + '/.htaccess'
	]).pipe(gulp.dest(pathProd + ''));

	let buildFonts = gulp.src([
		pathStage + '/fonts/**/*'
	]).pipe(gulp.dest(pathProd + '/fonts'));
	
	let buildJs = gulp.src([
		pathStage + '/js/*.js'
	]).pipe(gulp.dest(pathProd + '/js'));

	let buildShared = gulp.src([
		pathStage + '/shared/**/*'
	]).pipe(gulp.dest(pathProd + '/shared'));

	let buildDefault = gulp.src([
		pathStage + '/shared/default/**/*'
	]).pipe(gulp.dest(pathProd + '/shared/default'));

});

gulp.task('buildhtml', function() {
  gulp.src([pathStage + '/*.html'])
	.pipe(fileinclude({
		prefix: '@@'
	}))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest(pathProd + '/'));
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

gulp.task('removedist', function() { return del.sync(pathProd); });
