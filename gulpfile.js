var gulp = require('gulp');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var paths = {
  src: 'src',
  dest: '.'
};

gulp.task('build-markup', function () {
  return gulp.src(paths.src + '/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('build-styles', function () {
  return gulp.src(paths.src + '/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
});

gulp.task('build', ['build-markup', 'build-styles']);

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(paths.src + '/*.jade', ['build-markup'])
    .on('change', browserSync.reload);
  gulp.watch(paths.src + '/*.scss', ['build-styles']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: paths.dest,
    notify: false
  });
});

gulp.task('default', ['build', 'watch']);
