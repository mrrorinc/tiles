var gulp = require('gulp');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var addStream = require('add-stream');




// CSS

function compileCSS() {
  return gulp.src([
    'application/bower_components/angular-motion/dist/angular-motion.css',

    'application/components/**/*.css',
    'application/layout/**/*.css',
    'application/module/**/*.css'
  ])
    .pipe(require('gulp-concat')('tiles.css'))
  // .pipe(require('gulp-autoprefixer')('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('application/css'));
}

gulp.task('copy-bootstrap', function() {
  return gulp.src('application/bower_components/bootstrap/dist/**')
    .pipe(gulp.dest('application/css/bootstrap'));
});

gulp.task('compile:css', ['copy-bootstrap'], function() {
  return compileCSS();
});

gulp.task('dist:css', ['copy-bootstrap'], function() {
  return compileCSS()
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(require('gulp-minify-css')())
    .pipe(gulp.dest('application/css'));
});




// JavaScript + HTML templates

function compileJavaScript() {
  // var jshint = require('gulp-jshint');
  return gulp.src([
    'application/bower_components/jquery/dist/jquery.js',
    'application/bower_components/jquery-ui/jquery-ui.js',
    'application/bower_components/lodash/dist/lodash.js',
    'application/bower_components/bootstrap/dist/js/bootstrap.js',
    'application/bower_components/angular/angular.js',
    'application/bower_components/ui-router/release/angular-ui-router.js',
    'application/bower_components/angular-animate/angular-animate.js',
    'application/bower_components/angular-strap/dist/angular-strap.js',

    'application/main.js',
    'application/configuration/**/*.js',
    'application/service/**/*.js',
    'application/components/**/*.js',
    'application/module/**/*module.js',
    'application/module/**/*controller.js',
    'application/module/**/*.js'
  ])
  // .pipe(jshint())
  // .pipe(jshint.reporter(require('jshint-stylish')))
  .pipe(addStream.obj(prepareTemplates()))
    .pipe(require('gulp-concat')('tiles.js'))
}

function prepareTemplates() {
  return gulp
    .src([
      'application/*/*/*.html'
    ])
  // .pipe($.minifyHtml({empty: true}))
  .pipe(templateCache());
}

gulp.task('compile:javascript', function() {
  return compileJavaScript()
    .pipe(gulp.dest('application/js'));
});

gulp.task('dist:javascript', function() {
  return compileJavaScript()
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(require('gulp-ngmin')()) // ngmin makes angular injection syntax compatible with uglify
  .pipe(require('gulp-uglify')())
    .pipe(gulp.dest('application/js'));
});