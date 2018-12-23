const init = require('../../core/init');

const gulp = require('gulp'),
	del = require("del"),
	browserSync = require('browser-sync'),
	requireDir = require('require-dir');

let pathDev = '../../' + init.paths.root + '/dev',
	pathStage = '../../' + init.paths.root + '/staging';

let styles = init.langs.styles,
	scripts = init.langs.scripts,
	templates = init.langs.templates;

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

gulp.task('watch', [styles, 'template', scripts, `critical-styles_${styles}`, 'plugins', 'browser-sync'], function () {
	gulp.watch(pathDev + '/' + styles + '/page-styles/*.' + styles, [`page-styles_${styles}`]);
	gulp.watch(pathDev + '/' + styles + '/critical/*.' + styles, [`critical-styles_${styles}`]);
	gulp.watch(pathDev + '/' + styles + '/*.' + styles, [styles]);
	gulp.watch(pathDev + '/' + templates + '/*.' + templates, ['template']);
	gulp.watch(pathDev + '/' + scripts + '/*.' + scripts, [scripts]);
	gulp.watch(pathStage + '/*.html', browserSync.reload);
	gulp.watch(pathDev + '/default/**/*', ['default-folder']);
});

gulp.task('default', ['watch']);