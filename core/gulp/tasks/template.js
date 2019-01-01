const init  = require('../../../core/init');
const gulp = require('gulp');
const pug = require('gulp-pug');
const i18n = require('gulp-html-i18n');
const replace = require('gulp-replace');
const twig = require('gulp-twig');

const pathDev = '../../' + init.paths.root + '/dev';
const pathStage = '../../' + init.paths.root + '/staging';
const template = init.langs.templates;

const multilangTemplate = [
`<html>
  <body>
    <script>
      let userLang = navigator.language || navigator.userLanguage;
      window.location.href = userLang.slice(0, 2) + window.location.pathname;
    </script>
  </body>
</html>` ];

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
      langDir: pathDev + '/lang',
      trace: false,
      createLangDirs: true
    }))
    .pipe(gulp.dest(pathStage));
});

gulp.task('multilang', ['localize'], () => {
  return gulp.src(pathStage + '/*.html')
    .pipe(replace(/<(?:.|\n)*>/g, multilangTemplate[0]))
    .pipe(gulp.dest(pathStage));
});

gulp.task('template', [template], () => {
  if (init.multilang === 'Yes') gulp.start('multilang');
});