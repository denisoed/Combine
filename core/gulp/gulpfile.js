const gulp           = require('gulp'),
	del            = require("del"),
	browserSync    = require('browser-sync'),
	requireDir     = require('require-dir');
	
let pathDev = '../../dev',
	pathStage = '../../staging';

requireDir('tasks', { recurse: true });


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: pathStage
		},
		notify: false
	});
});

gulp.task('clean', function () {
	return del(pathStage + '/shared/default/**/*', {force: true});
});

gulp.task('default-folder', ['clean'], function() {
	gulp.src(pathDev + '/default/**/*')
		.pipe(gulp.dest(pathStage + '/shared/default'));
});

gulp.task('watch', ['sass', 'pug', 'script', 'default-folder', 'browser-sync'], function() {
	gulp.watch(pathDev   +  '/sass/styles/*.sass', ['styles']);
	gulp.watch(pathDev   +  '/sass/styles/critical/*.sass', ['critical']);
	gulp.watch(pathDev   +  '/sass/*.sass', ['sass']);
	gulp.watch(pathStage + '/*.html', browserSync.reload);
	gulp.watch(pathDev   +  '/pug/*.pug', ['pug']);
	gulp.watch(pathDev   +  '/js/script.js', ['script']);
	gulp.watch(pathDev   +  '/default/**/*', ['default-folder']);
});

gulp.task('default', ['watch']);
