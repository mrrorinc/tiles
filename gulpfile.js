var gulp = require('gulp');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var addStream = require('add-stream');
var minifyHTML = require('gulp-minify-html');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');




// CSS

function concatenateCSS() {
  return gulp.src([
    'application/bower_components/angular-motion/dist/angular-motion.css',

    'application/components/**/*.css',
    'application/layout/**/*.css',
    'application/module/**/*.css'
  ])
    .pipe(require('gulp-concat')('tiles.css'))
  // .pipe(require('gulp-autoprefixer')('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('css'));
}

gulp.task('copy-bootstrap', function() {
  return gulp.src('application/bower_components/bootstrap/dist/**')
    .pipe(gulp.dest('css/bootstrap'));
});

gulp.task('concat-css', ['copy-bootstrap'], function() {
  return concatenateCSS();
});

gulp.task('build-css', ['copy-bootstrap'], function() {
  return concatenateCSS()
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(require('gulp-minify-css')())
    .pipe(gulp.dest('css'));
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
      'application/**/*.html',
      'application/**/*.html'
    ])
  .pipe(minifyHTML({empty: true}))
  .pipe(templateCache());
}

gulp.task('concat-javascript', function() {
  return compileJavaScript()
    .pipe(gulp.dest('js'));
});

gulp.task('build-javascript', function() {
  return compileJavaScript()
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(require('gulp-ngmin')()) // ngmin makes angular injection syntax compatible with uglify
  .pipe(require('gulp-uglify')())
    .pipe(gulp.dest('js'));
});





// html

gulp.task('html', function() {
  return gulp.src(['index.html']).pipe(livereload());
});




// webserver, watch and build

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
  // LiveReload
  livereload.listen();

  // Watch HTML and livereload
  gulp.watch('index.html', ['html']);
  gulp.watch([
		'application/main.js',
		'application/components/**/*.js',
		'application/configuration/**/*.js',
		'application/module/**/*.js',
		'application/service/**/*.js'
	], ['concat-javascript']);
  gulp.watch([
		'application/components/**/*.css',
		'application/module/**/*.css',
		'application/layout/**/*.css'
	], ['concat-css']);
});

gulp.task('watch-build', function() {
  // LiveReload
  livereload.listen();

  // Watch HTML and livereload
  gulp.watch('index.html', ['html']);
  gulp.watch([
		'application/main.js',
		'application/components/**/*.js',
		'application/configuration/**/*.js',
		'application/module/**/*.js',
		'application/service/**/*.js'
  ], ['build-javascript']);
  gulp.watch([
		'application/components/**/*.css',
		'application/module/**/*.css',
		'application/layout/**/*.css'
	], ['build-css']);
});

gulp.task('start', ['concat-css', 'concat-javascript', 'webserver', 'watch']);
gulp.task('build', ['build-css', 'build-javascript', 'webserver', 'watch-build']);
gulp.task('default', ['start']);