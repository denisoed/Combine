var gulp           = require('gulp'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    cache          = require('gulp-cache'),
	pngquant       = require('imagemin-pngquant'),
	gulpif         = require('gulp-if'),
	useref         = require('gulp-useref'),
	uglify         = require('gulp-uglify'),
    gulpRemoveHtml = require('gulp-remove-html');

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass'], function() {

	var buildLibs = gulp.src('stage/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulp.dest('stage'));

	var buildCssLibs = gulp.src([
		'stage/css/libs.min.css'
	]).pipe(gulp.dest('dist/css'));

	var buildCssBase = gulp.src([
		'stage/css/base.min.css'
	]).pipe(gulp.dest('dist/css'));

	var buildCssStyles = gulp.src([
		'stage/css/styles/*.css'
	]).pipe(gulp.dest('dist/css/styles'));

	var buildFiles = gulp.src([
		'stage/.htaccess'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src([
		'stage/webfonts/**/*'
	]).pipe(gulp.dest('dist/webfonts'));
	
	var buildJs = gulp.src([
		'stage/js/*.js'
	]).pipe(gulp.dest('dist/js'));

	var buildShared = gulp.src([
		'stage/shared/**/*'
	]).pipe(gulp.dest('dist/shared'));

});

gulp.task('buildhtml', function() {
  gulp.src(['stage/*.html'])
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function() {
	return gulp.src('stage/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('removedist', function() { return del.sync('dist'); });
