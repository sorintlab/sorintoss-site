import gulp from "gulp";
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import {spawn} from "child_process";
import hugoBin from "hugo-bin";
import BrowserSync from "browser-sync";

const browserSync = BrowserSync.create();

// Hugo arguments
const hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v"];
const hugoArgsPreview = ["--buildDrafts", "--buildFuture"];

// Development tasks
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, hugoArgsPreview));

// Build/production tasks
gulp.task("build", ["css", "scss", "js", "webfonts", "img"], (cb) => buildSite(cb, [], "production"));
gulp.task("build-preview", ["css", "scss", "js", "webfonts", "img"], (cb) => buildSite(cb, hugoArgsPreview, "production"));

gulp.task('css', function () {
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
})

// Compile SCSS files to CSS
gulp.task('scss', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 20 versions']
    }))
    .pipe(gulp.dest('dist/css'))
})

// Hash javascript
gulp.task('js', function () {
  gulp.src([
    'src/js/**/*',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/owl.carousel/dist/owl.carousel.js',
    'node_modules/netlify-cms/dist/cms.js'
  ])
    .pipe(gulp.dest('dist/js'))
})

gulp.task('webfonts', function () {
  gulp.src([
    'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/**/*'
  ])
    .pipe(gulp.dest('dist/webfonts'))
})

gulp.task('img', function () {
  gulp.src([
    'src/img/**/*'
  ])
    .pipe(gulp.dest('dist/img'))
})

// Development server with browsersync
gulp.task("server", ["hugo", "css", "scss", "js", "webfonts", "img"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    notify: false
  });
  gulp.watch('src/css/**/*', ['css'])
  gulp.watch('src/scss/**/*', ['scss'])
  gulp.watch('src/js/**/*', ['js'])
  gulp.watch('src/img/**/*', ['img'])
  gulp.watch("site/**/*", ["hugo"]);
});

// Watch asset folder for changes
gulp.task('watch', function () {
  gulp.watch('src/css/**/*', ['css'])
  gulp.watch('src/scss/**/*', ['scss'])
  gulp.watch('src/js/**/*', ['js'])
  gulp.watch('src/img/**/*', ['img'])
})

gulp.task('default', ['css', 'scss', 'js', 'webfonts', 'img'])

/**
 * Run hugo and build the site
 */
function buildSite(cb, options, environment = "development") {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = environment;

  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
