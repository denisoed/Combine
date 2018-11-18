const config = require('../../options/config');

const gulp = require('gulp'),
	del = require("del"),
	browserSync = require('browser-sync'),
	requireDir = require('require-dir');

let pathDev = `../../${config.paths.dev}`,
	pathStage = `../../${config.paths.staging}`;

let styles = config.langs.styles,
	scripts = config.langs.scripts,
	templates = config.langs.templates;

requireDir('tasks', {
	recurse: true
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: pathStage
		},
		notify: false
		// tunnel: true
	});
});

gulp.task('clean', function () {
	return del(pathStage + '/shared/default/**/*', {
		force: true
	});
});

gulp.task('default-folder', ['clean'], function () {
	gulp.src(pathDev + '/default/**/*')
		.pipe(gulp.dest(pathStage + '/shared/default'));
});

gulp.task('watch', [styles, templates, scripts, 'default-folder', 'browser-sync'], function () {
	gulp.watch(pathDev + '/' + styles + '/styles/*.' + styles, ['styles']);
	gulp.watch(pathDev + '/' + styles + '/critical/*.' + styles, ['critical']);
	gulp.watch(pathDev + '/' + styles + '/*.' + styles, [styles]);
	gulp.watch(pathDev + '/' + templates + '/*.' + templates, [templates]);
	gulp.watch(pathDev + '/' + scripts + '/*.' + scripts, [scripts]);
	gulp.watch(pathStage + '/*.html', browserSync.reload);
	gulp.watch(pathDev + '/default/**/*', ['default-folder']);
});

gulp.task('default', ['watch']);