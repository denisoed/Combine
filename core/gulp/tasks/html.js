const config  = require('../../../options/config');
const gulp = require('gulp');
const pug = require('gulp-pug');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');

let pathDev = '../../' + config.paths.dev,
    pathStage = '../../' + config.paths.staging;

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

gulp.task('hbs', function () {
  gulp.src(pathDev + '/hbs/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('hbs.js'))
    .pipe(gulp.dest(pathStage));
});
