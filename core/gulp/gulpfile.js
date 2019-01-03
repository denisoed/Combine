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

gulp.task('browser-sync', (done) => {
	browserSync({
		server: {
			baseDir: pathStage
		},
		notify: false
		// tunnel: true
	});
	done();
});

gulp.task('watch', gulp.parallel(styles, 'template', scripts, `critical-styles_${styles}`, 'browser-sync', (done) => {
	// gulp.watch(pathDev + '/' + styles + '/page-styles/*.' + styles, gulp.series(`page-styles_${styles}`));
	// gulp.watch(pathDev + '/' + styles + '/critical/*.' + styles, gulp.series(`critical-styles_${styles}`));
	// gulp.watch(pathDev + '/' + styles + '/*.' + styles, gulp.series(styles));
	gulp.watch(pathDev + '/' + templates + '/*.' + templates, gulp.series('template'));
	// gulp.watch(pathDev + '/' + scripts + '/*.' + scripts, gulp.series(scripts));
	gulp.watch(pathStage + '/*.html', browserSync.reload);
	done();
}));

gulp.task('default', gulp.parallel('watch'));