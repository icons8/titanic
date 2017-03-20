var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourceMaps = require('gulp-sourcemaps');

gulp.task('default', function (callback) {
  runSequence('build',
    'watch',
    callback);
});

gulp.task('vendor', function () {
  return gulp.src(['./node_modules/bodymovin/build/player/bodymovin.min.js'])
    .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('js', function () {
  return gulp.src(['./src/js/titanic.js'])
    .pipe(sourceMaps.init())
    .pipe(concat('titanic.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('../maps'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('images', function () {
  return gulp.src('src/icons/*')
    .pipe(gulp.dest('dist/icons/'));
});

// Cleans all /dist
gulp.task('clean', function () {
  console.log('Cleaning...');
  return del('dist/*');
});

gulp.task('build', function (callback) {
  runSequence('clean', ['images', 'vendor', 'js'],
    callback);
});

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('gulpfile.js', ['build']);
});