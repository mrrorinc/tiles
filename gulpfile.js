var gulp = require('gulp');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var addStream = require('add-stream');
var minifyHTML = require('gulp-minify-html');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var htmlbuild = require('gulp-htmlbuild');




// CSS

function concatenateCSS() {
	return gulp.src([
		'application/bower_components/angular-motion/dist/angular-motion.css',
		'application/bower_components/bootstrap/dist/**/*.min.css',

		'application/components/**/*.css',
		'application/layout/**/*.css',
		'application/module/**/*.css'
	])
		.pipe(require('gulp-concat')('tiles.css'))
	// .pipe(require('gulp-autoprefixer')('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
}

gulp.task('copy-bootstrap-start', function() {
	return gulp.src('application/bower_components/bootstrap/dist/**')
		.pipe(gulp.dest('start'));
});

gulp.task('copy-bootstrap-build', function() {
	return gulp.src('application/bower_components/bootstrap/dist/**')
		.pipe(gulp.dest('build'));
});

gulp.task('concat-css', ['copy-bootstrap-start'], function() {
	return concatenateCSS()
		.pipe(gulp.dest('start/css'));
});

gulp.task('build-css', ['copy-bootstrap-build'], function() {
	return concatenateCSS()
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(require('gulp-minify-css')())
		.pipe(gulp.dest('build/css'));
});




// JavaScript + HTML templates

function concatenateJavaScript() {
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
		.pipe(minifyHTML({
			empty: true
		}))
		.pipe(templateCache());
}

gulp.task('concat-javascript', function() {
	return concatenateJavaScript()
		.pipe(gulp.dest('start/js'));
});

gulp.task('build-javascript', function() {
	return concatenateJavaScript()
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(require('gulp-ngmin')()) // ngmin makes angular injection syntax compatible with uglify
	.pipe(require('gulp-uglify')())
		.pipe(gulp.dest('build/js'));
});





// html

gulp.task('html-start', function() {
	return gulp.src(['application/index.html'])
		.pipe(htmlbuild({
			js: htmlbuild.preprocess.js(function(block) {
				block.write('js/tiles.js');
				block.end();
			}),
			css: htmlbuild.preprocess.css(function(block) {
				block.write('css/tiles.css');
				block.end();
			})
		}))
		.pipe(gulp.dest('start'))
		.pipe(livereload());
});

gulp.task('html-build', function() {
	return gulp.src(['application/index.html'])
		.pipe(htmlbuild({
			js: htmlbuild.preprocess.js(function(block) {
				block.write('js/tiles.min.js');
				block.end();
			}),
			css: htmlbuild.preprocess.css(function(block) {
				block.write('css/tiles.min.css');
				block.end();
			})
		}))
		.pipe(gulp.dest('build'))
		.pipe(livereload());
});




// webserver, watch and build

gulp.task('webserver-start', function() {
	connect.server({
		root: 'start',
		livereload: true
	});
});

gulp.task('webserver-build', function() {
	connect.server({
		root: 'build',
		livereload: true
	});
});

gulp.task('start-watch', function() {
	// LiveReload
	livereload.listen();

	// Watch HTML and livereload
	gulp.watch('application/index.html', ['html-start']);
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

gulp.task('build-watch', function() {
	// LiveReload
	livereload.listen();

	// Watch HTML and livereload
	gulp.watch('application/index.html', ['html-build']);
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

gulp.task('start', ['concat-css', 'concat-javascript', 'html-start', 'webserver-start', 'start-watch']);
gulp.task('build', ['build-css', 'build-javascript', 'html-build', 'webserver-build', 'build-watch']);
gulp.task('default', ['start']);
