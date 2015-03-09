var gulp = require("gulp"),
  path = require("path"),
  gutil = require("gulp-util"),
  rename = require("gulp-rename"),
  pkg = require("./package.json");

var SRC  = "application";

var SRC_LESS_BASE  = path.join(SRC, "less");
var SRC_JAVASCRIPT_BASE  = path.join(SRC, "");
var SRC_IMAGES_BASE  = path.join(SRC, "img");

var SRC_ALL  = path.join(SRC, "**");
var SRC_HTML  = path.join(SRC, "html", "**", "*.html");
var SRC_LESS_ALL  = path.join(SRC_LESS_BASE, "**", "*.less");
var SRC_JAVASCRIPT_CONFIGURATION = "application/configuration/**/*.js";
var SRC_JAVASCRIPT_MAIN  = "application/main.js";
var SRC_JAVASCRIPT_SERVICE  = "application/service/**/*.js";
var SRC_JAVASCRIPT_MODULE  = "application/module/**/*module.js";
var SRC_JAVASCRIPT_MODULE_CONTROLLERS = "application/module/**/*controller.js";
var SRC_JAVASCRIPT_MODULE_COMPONENTS = "application/module/**/*.js";
var SRC_JAVASCRIPT_COMPONENTS  = "application/components/**/*.js";
var SRC_IMAGES_ALL  = path.join(SRC_IMAGES_BASE, "**", "*");

var DIST = "application";
var DIST_LIB = path.join(DIST, "lib");
var DIST_ALL = path.join(DIST, "**");
var DIST_CSS = path.join(DIST, "css");
var DIST_JAVASCRIPT = path.join(DIST, "js");
var DIST_IMAGES = path.join(DIST, "img");

var MAIN_SCRIPT = "tiles.js";
var MAIN_STYLE = "tiles.css";


// LESS

// Compile app/less sources in CSS and auto-prefix the CSS
function compileCSS() {
  return gulp.src([
    "application/bower_components/angular-motion/dist/angular-motion.css",

    "application/components/**/*.css",
    "application/layout/**/*.css",
    "application/module/**/*.css"
  ])
    .pipe(require("gulp-concat")(MAIN_STYLE))
  
    // .pipe(require("gulp-autoprefixer")("last 2 version", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
    .pipe(gulp.dest(DIST_CSS));
}

gulp.task("compile:css", ["update", "copy-bootstrap"], function() {
  return compileCSS();
});

gulp.task("copy-bootstrap", ["update"], function() {
  return gulp.src("application/bower_components/bootstrap/dist/**")
    .pipe(gulp.dest("application/css/bootstrap"));
});

// Minify the CSS
gulp.task("dist:css", ["update", "copy-bootstrap"], function() {
  return compileCSS()
    .pipe(rename({ suffix: ".min" }))
    .pipe(require('gulp-minify-css')())
    .pipe(gulp.dest(DIST_CSS));
});


// JavaScripts

// Run JSHint on all of the app/js files and concatenate everything together
function compileJavaScript() {
  var jshint = require("gulp-jshint");
  return gulp.src([
    "application/bower_components/jquery/dist/jquery.js",
    "application/bower_components/jquery-ui/jquery-ui.js",
    "application/bower_components/lodash/dist/lodash.js",
    "application/bower_components/bootstrap/dist/js/bootstrap.js",
    "application/bower_components/angular/angular.js",
    "application/bower_components/ui-router/release/angular-ui-router.js",
    "application/bower_components/angular-animate/angular-animate.js",
    "application/bower_components/angular-strap/dist/angular-strap.js",
    
    SRC_JAVASCRIPT_MAIN,
    SRC_JAVASCRIPT_CONFIGURATION,
    SRC_JAVASCRIPT_SERVICE,
    SRC_JAVASCRIPT_COMPONENTS,
    SRC_JAVASCRIPT_MODULE,
    SRC_JAVASCRIPT_MODULE_CONTROLLERS,
    SRC_JAVASCRIPT_MODULE_COMPONENTS
  ])
    // .pipe(jshint())
    // .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(require("gulp-concat")(MAIN_SCRIPT))
    .pipe(gulp.dest(DIST_JAVASCRIPT));
}

gulp.task("compile:javascript", ["update"], function() {
  return compileJavaScript();
});

// Uglify the JS
gulp.task("dist:javascript", ["update"], function() {
  return compileJavaScript()
    .pipe(rename({ suffix: ".min" }))
    .pipe(require('gulp-ngmin')()) // ngmin makes angular injection syntax compatible with uglify
    .pipe(require("gulp-uglify")())
    .pipe(gulp.dest(DIST_JAVASCRIPT));
});


// Images

gulp.task("compile:images", ["update"], function() {
  return gulp.src(SRC_IMAGES_ALL)
    .pipe(gulp.dest(DIST_IMAGES));
});

// Compress the images
gulp.task("dist:images", ["update"], function() {
  return gulp.src(SRC_IMAGES_ALL)
    .pipe(require("gulp-imagemin")({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(DIST_IMAGES));
});


// Copy the html assets without modification
gulp.task("compile:html", ["update"], function() {
  return gulp.src(SRC_HTML)
    .pipe(gulp.dest(DIST));
});


// Replace the non-minified paths in html assets with the minified paths
// Todo: This brute force hacky way of doing this is error prone
gulp.task("dist:html", ["update"], function() {
  var replace = require('gulp-replace');

  return gulp.src(SRC_HTML)
      .pipe(replace(/\.js/g, ".min.js"))
      .pipe(replace(/\.css/g, ".min.css"))
      .pipe(gulp.dest(DIST));
});


// Copy Bower assets
gulp.task("copy-bower", ["update"], function() {
  return gulp.src("bower_components/**")
    .pipe(gulp.dest(DIST_LIB));
});


// Compile everything
gulp.task("compile", ["copy-bower", "compile:html", "compile:less", "compile:javascript", "compile:images"]);


// Dist everything
gulp.task("dist", ["copy-bower", "dist:html", "dist:less", "dist:javascript", "dist:images"]);


// Clean the DIST dir
gulp.task("clean", function() {
  return gulp.src([DIST, ".build"], {read: false})
    .pipe(require("gulp-clean")());
});


// Updates the Bower dependencies based on the bower.json file
gulp.task("update", function(next) {

  var needsUpdate = false;

  gulp.src("bower.json")
    .pipe(require("gulp-newer")(".build"))
    .pipe(gulp.dest(".build")) // todo: don't do this if the bower install fails
    .on("end", function() {
      if (!needsUpdate) {
        next();
      }
    })
    .on("close", function() {
      if (!needsUpdate) {
        next();
      }
    })
    .on("error", function(error) {
      if (!needsUpdate) {
        next(error);
      }
    })
    .on("data", function() {
      // updated bower.json
      needsUpdate = true;
      gutil.log("Updating Bower Dependencies");
      require("bower").commands.install([], {}, { interactive: false })
        .on("end", function () {
          gutil.log("Bower Dependencies Updated");
          next();
        })
        .on("log", function (log) {
          if (log.level == "action" && log.id == "install") {
            gutil.log("Added Bower Dependency: " + log.message);
          }
        })
        .on("error", function (error) {
          gutil.error("Bower Error: ", error);
          next(error);
        });
    });

});


// Server that serves static content from DIST
gulp.task("server", ["compile"], function(next) {
  var port = process.env.PORT || 5000;
  var connect = require("connect");
  var server = connect();
  server.use(connect.static(DIST)).listen(port, next);
  gutil.log("Server up and running: http://localhost:" + port);
});


// Auto-Reloading Development Server
gulp.task("dev", ["server"], function() {

  gulp.watch(SRC_ALL, ["compile"]);
  gulp.watch("bower.json", ["copy-bower"]);

  var lrserver = require("gulp-livereload")();

  gulp.watch(DIST_ALL).on("change", function(file) {
    lrserver.changed(file.path);
  });

});


// Prod Server
gulp.task("prod", ["server", "dist"]);


// Help
gulp.task("help", function(next) {
  gutil.log("--- " + pkg.name + " ---");
  gutil.log("");
  gutil.log("See all of the available tasks:");
  gutil.log("$ gulp -T");
  gutil.log("");
  gutil.log("Run a dev mode server:");
  gutil.log("$ gulp dev");
  gutil.log("");
  gutil.log("Run a prod mode server:");
  gutil.log("$ gulp prod");
  next();
});


// Default
gulp.task("default", ["help"]);