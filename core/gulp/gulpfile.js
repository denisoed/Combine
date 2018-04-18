const combine 	   = require('../../options/combine');

const gulp         = require('gulp'),
	del            = require("del"),
	browserSync    = require('browser-sync'),
	requireDir     = require('require-dir');
	
let pathDev = combine.path.dev,
	pathStage = combine.path.staging;

let styles = combine.generator.styles,
	scripts = combine.generator.scripts,
	templates = combine.generator.templates;

requireDir('tasks', { recurse: true });


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: pathStage
		},
		notify: false
		// tunnel: true
	});
});

gulp.task('clean', function () {
	return del(pathStage + '/shared/default/**/*', {force: true});
});

gulp.task('default-folder', ['clean'], function() {
	gulp.src(pathDev + '/default/**/*')
		.pipe(gulp.dest(pathStage + '/shared/default'));
});

gulp.task('watch', [styles, templates, scripts, 'default-folder', 'browser-sync'], function() {
	gulp.watch(pathDev   +  styles + '/styles/*.' + styles, ['styles']);
	gulp.watch(pathDev   +  styles + '/styles/critical/*.' + styles, ['critical']);
	gulp.watch(pathDev   +  styles + '/*.' + styles, [styles]);
	gulp.watch(pathDev   +  templates + '/*.' + templates, [templates]);
	gulp.watch(pathDev   +  scripts + '/script.js', [scripts]);
	gulp.watch(pathStage + '/*.html', browserSync.reload);
	gulp.watch(pathDev   +  '/default/**/*', ['default-folder']);
});

gulp.task('default', ['watch']);
