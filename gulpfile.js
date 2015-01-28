"use strict";
var gulp = require('gulp');
var clean = require('gulp-clean');
var jsdoc = require("gulp-jsdoc");


gulp.task('karma.unit', function () {
    return gulp.src('app/**/*.test.js')
        .pipe(karma({
            configFile: 'karma.config.js'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('karma.watch', function () {
    return gulp.src('app/**/*.test.js')
        .pipe(karma({
            configFile: 'karma.config.js',
            action: 'watch'
        }));
});

//generating documentation
gulp.task("docs", function(){
	//http://usejsdoc.org
	return gulp.src("./app/**/*.js")
		.pipe(jsdoc('./documentation'))
});

gulp.task('clean', function () {
	// Remove entire build dir contents and app/build
	return gulp.src(['build','app/build/**', 'documentation'], { read: false })
		.pipe(clean());
});


gulp.task('default', ['clean'], function () {
    gulp.start('');
});
