var gulp           = require('gulp'),
	browserSync    = require('browser-sync'),
	requireDir     = require('require-dir');

requireDir('gulp/tasks', { recurse: true });

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'stage'
		},
		notify: false
	});
});

gulp.task('watch', ['sass', 'pug', 'script', 'browser-sync'], function() {
	gulp.watch('dev/sass/styles/*.sass', ['styles']);
	gulp.watch('dev/sass/*.sass', ['sass']);
	gulp.watch('stage/*.html', browserSync.reload);
	gulp.watch('dev/pug/*.pug', ['pug']);
	gulp.watch('dev/js/script.js', ['script']);
});

gulp.task('default', ['watch']);
