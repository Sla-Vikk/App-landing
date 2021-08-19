
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const include = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const image = require('gulp-image');

const cssFiles = [
   './views/public/css/css-reset.css',
   './views/public/css/style.css',
   './views/public/css/media.css'
]
const jsFiles = [
   './views/public/js/lib.js',
   './views/public/js/main.js'
]

function html() {
   return gulp.src('**.html')
   .pipe(include({
       prefix: '@@'
   }))
   .pipe(gulp.dest('./build/'))
   .pipe(browserSync.stream());
}

function imgs() {
   return gulp.src('./views/public/img/*')
   .pipe(image({
     pngquant: true,
     optipng: false,
     zopflipng: true,
     jpegRecompress: false,
     mozjpeg: true,
     gifsicle: true,
     svgo: true,
     concurrent: 10,
     quiet: true // defaults to false
   }))
   .pipe(gulp.dest('./build/img'))
   .pipe(browserSync.stream());
}

function styles() {
   return gulp.src(cssFiles)
   .pipe(concat('style.css'))
   .pipe(autoprefixer({
      browserslistrc: ['last 2 versions'],
      cascade: false
   }))
   .pipe(cleanCSS({
      level: 2
   }))
   .pipe(gulp.dest('./build/css'))
   .pipe(browserSync.stream());
}

function scripts() {
   return gulp.src(jsFiles)
   .pipe(concat('script.js'))
   .pipe(uglify({
      toplevel: true
   }))
   .pipe(gulp.dest('./build/js'))
   .pipe(browserSync.stream());
}

function clean() {
   return del(['build/*'])
}

function watch() {
   browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch('./views/public/css/**/*.css', styles)
  gulp.watch('./views/public/js/**/*.js', scripts)
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('html', html);
gulp.task('imgs', imgs);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(html,imgs,styles,scripts)));
gulp.task('dev', gulp.series('build','watch'));