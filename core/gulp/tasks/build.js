const gulp           = require('gulp'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	cache          = require('gulp-cache'),
	pngquant       = require('imagemin-pngquant'),
	gulpif         = require('gulp-if'),
	useref         = require('gulp-useref'),
	uglify         = require('gulp-uglify'),
	gulpRemoveHtml = require('gulp-remove-html');

let pathDev = '../../dev',
	pathStage = '../../stage',
	pathDist = '../../dist';

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass'], function() {

	var buildLibs = gulp.src(pathStage + '/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest(pathStage + '/'));

	var buildCssLibs = gulp.src([
		pathStage + '/css/libs.min.css'
	]).pipe(gulp.dest(pathDist + '/css'));

	var buildCssBase = gulp.src([
		pathStage + '/css/base.min.css'
	]).pipe(gulp.dest(pathDist + '/css'));

	var buildCssStyles = gulp.src([
		pathStage + '/css/styles/*.css'
	]).pipe(gulp.dest(pathDist + '/css/styles'));

	var buildFiles = gulp.src([
		pathStage + '/.htaccess'
	]).pipe(gulp.dest(pathDist + ''));

	var buildFonts = gulp.src([
		pathStage + '/webfonts/**/*'
	]).pipe(gulp.dest(pathDist + '/webfonts'));
	
	var buildJs = gulp.src([
		pathStage + '/js/*.js'
	]).pipe(gulp.dest(pathDist + '/js'));

	var buildShared = gulp.src([
		pathStage + '/shared/**/*'
	]).pipe(gulp.dest(pathDist + '/shared'));

});

gulp.task('buildhtml', function() {
  gulp.src([pathStage + '/*.html'])
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest(pathDist + '/'));
});

gulp.task('imagemin', function() {
	return gulp.src(pathStage + '/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(pathDist + '/img'));
});

gulp.task('removedist', function() { return del.sync(pathDist); });
