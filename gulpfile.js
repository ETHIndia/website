const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const header = require("gulp-header");
const pkg = require("./package.json");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");

// Copy third party libraries from /node_modules into /vendor
function vendor(done) {
  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*",
    ])
    .pipe(gulp.dest("./vendor/bootstrap"));

  // Font Awesome
  gulp
    .src([
      "./node_modules/font-awesome/**/*",
      "!./node_modules/font-awesome/{less,less/*}",
      "!./node_modules/font-awesome/{scss,scss/*}",
      "!./node_modules/font-awesome/.*",
      "!./node_modules/font-awesome/*.{txt,json,md}",
    ])
    .pipe(gulp.dest("./vendor/font-awesome"));

  // jQuery
  gulp
    .src(["./node_modules/jquery/dist/*", "!./node_modules/jquery/dist/core.js"])
    .pipe(gulp.dest("./vendor/jquery"));

  // jQuery Easing
  gulp.src(["./node_modules/jquery.easing/*.js"]).pipe(gulp.dest("./vendor/jquery-easing"));

  // Scrollreveal
  gulp.src(["./node_modules/scrollreveal/dist/*.js"]).pipe(gulp.dest("./vendor/scrollreveal"));

  done();
}

// Compiles SCSS
function cssCompile(done) {
  gulp
    .src("./scss/**/*.scss")
    .pipe(
      sass
        .sync({
          outputStyle: "expanded",
        })
        .on("error", sass.logError)
    )
    .pipe(gulp.dest("./css"));

  done();
}

// Minify CSS
function cssMinify(done) {
  gulp
    .src(["./css/*.css", "!./css/*.min.css"])
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());

  done();
}

// CSS
const css = gulp.series(cssCompile, cssMinify);

// Minify JavaScript
function js() {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./js"))
    .pipe(browserSync.stream());
}

// Build

const build = gulp.series(css, js, vendor);

// Development

function watchCss(done) {
  gulp.watch("./scss/*.scss", css);
  done();
}

function watchJs(done) {
  gulp.watch("./js/*.js", js);
  done();
}

function watchHtml(done) {
  gulp.watch("./*.html", browserSync.reload);
  done();
}

// Watch all HTML, CSS, and JS files
const watch = gulp.parallel(watchCss, watchJs, watchHtml);

// BrowserSync config
function server(done) {
  if (browserSync) {
    browserSync.init({
      server: {
        baseDir: "./",
      },
    });
  }

  done();
}

// Dev task
const dev = gulp.series(css, js, server, watch);

// Exports
exports.build = build;
exports.copy = vendor;
exports.default = build;
exports.dev = dev;
