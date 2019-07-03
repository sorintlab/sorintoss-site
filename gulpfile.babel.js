import path from "path";
import gulp from "gulp";
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import { spawn } from "child_process";
import BrowserSync from "browser-sync";

const browserSync = BrowserSync.create();

const hugoBin = path.resolve(process.cwd(), 'bin', 'hugo', 'hugo')

// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture", '-b', process.env.DEPLOY_PRIME_URL];

// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));


gulp.task('css', function (done) {
  gulp.src([
    'src/css/**/*.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/owl.carousel/dist/assets/owl.carousel.css',
    'node_modules/owl.carousel/dist/assets/owl.theme.default.css',
    'node_modules/animate.css/animate.css',
    'node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css',
    'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    'node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    'node_modules/netlify-cms/dist/cms.css'
  ])
    .pipe(gulp.dest('dist/css'))

  done()
})

// Compile SCSS files to CSS
gulp.task('scss', function (done) {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 20 versions']
    }))
    .pipe(gulp.dest('dist/css'))

  done()
})

// Hash javascript
gulp.task('js', function (done) {
  gulp.src([
    'src/js/**/*',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/owl.carousel/dist/owl.carousel.js',
    'node_modules/netlify-cms/dist/cms.js'
  ])
    .pipe(gulp.dest('dist/js'))

  done()
})

gulp.task('webfonts', function (done) {
  gulp.src([
    'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/**/*'
  ])
    .pipe(gulp.dest('dist/webfonts'))

  done()
})

gulp.task('img', function (done) {
  gulp.src([
    'src/img/**/*'
  ])
    .pipe(gulp.dest('dist/img'))

  done()
})

// Development server with browsersync
gulp.task("server", gulp.series(["hugo", "css", "scss", "js", "webfonts", "img"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false
  });
  gulp.watch('src/css/**/*', gulp.series(['css', 'hugo']))
  gulp.watch('src/scss/**/*', gulp.series(['scss', 'hugo']))
  gulp.watch('src/js/**/*', gulp.series(['js', 'hugo']))
  gulp.watch('src/img/**/*', gulp.series(['img', 'hugo']))
  gulp.watch("site/**/*", gulp.series(["hugo"]))
}));

// Watch asset folder for changes
gulp.task('watch', function () {
  gulp.watch('src/css/**/*', gulp.series(['css']))
  gulp.watch('src/scss/**/*', gulp.series(['scss']))
  gulp.watch('src/js/**/*', gulp.series(['js']))
  gulp.watch('src/img/**/*', gulp.series(['img']))
})

gulp.task('default', gulp.series(['css', 'scss', 'js', 'webfonts', 'img']))

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, { stdio: "inherit" }).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}


// Build/production tasks
gulp.task("build", gulp.series(["css", "scss", "js", "webfonts", "img"], (cb) => buildSite(cb, [], "production")));
gulp.task("build-preview", gulp.series(["css", "scss", "js", "webfonts", "img"], (cb) => buildSite(cb, hugoArgsPreview, "production")));