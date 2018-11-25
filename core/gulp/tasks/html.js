const init  = require('../../../core/init');
const gulp = require('gulp');
const pug = require('gulp-pug');
const twig = require('gulp-twig');

let pathDev = '../../' + init.paths.root + '/dev',
  pathStage = '../../' + init.paths.root + '/staging';

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
