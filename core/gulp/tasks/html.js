const init  = require('../../../core/init');
const gulp = require('gulp');
const pug = require('gulp-pug');
const i18n = require('gulp-html-i18n');
const twig = require('gulp-twig');

const pathDev = '../../' + init.paths.root + '/dev';
const pathStage = '../../' + init.paths.root + '/staging';
const template = init.langs.templates;

gulp.task('pug', function() {
  return gulp.src(pathDev + '/pug/*.pug')
    .pipe( pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(pathStage));
  });

gulp.task('html', function () {
    return gulp.src(pathDev + '/html/**/*.html')
    .pipe(gulp.dest(pathStage));
});

gulp.task('twig', function () {
  return gulp.src(pathDev + '/twig/*.twig')
    .pipe(twig())
    .pipe(gulp.dest(pathStage));
});

gulp.task('localize', function () {
  return gulp.src(pathStage + '/*.html')
    .pipe(i18n({
      langDir: pathStage + '/lang',
      trace: true
    }))
    .pipe(gulp.dest(pathStage + '/pages'));
});

gulp.task('template', [template], () => {
  if (init.multilang === 'Yes') gulp.start('localize');
});