const gulp           = require('gulp'),
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

gulp.task('watch', ['sass', 'pug', 'script', 'browser-sync'], function() {
	gulp.watch(pathDev   +  '/sass/styles/*.sass', ['styles']);
	gulp.watch(pathDev   +  '/sass/*.sass', ['sass']);
	gulp.watch(pathStage + '/*.html', browserSync.reload);
	gulp.watch(pathDev   +  '/pug/*.pug', ['pug']);
	gulp.watch(pathDev   +  '/js/script.js', ['script']);
});

gulp.task('default', ['watch']);
