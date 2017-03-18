var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourceMaps = require('gulp-sourcemaps');


gulp.task('default', function(callback) {
runSequence('build', 
            'watch', 
             callback);
});

// JS for bodymovin and jQuery
gulp.task('js', function() {
  return gulp.src([
    './src/js/titanic.js',
    './node_modules/bodymovin/build/player/bodymovin.js'
    ])
    .pipe(sourceMaps.init())
      .pipe(concat('titanic.js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
    .pipe(sourceMaps.write('../maps'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('images', function() {
  return gulp.src('src/icons/*')
    .pipe(gulp.dest('dist/icons/'));
});

// Cleans all /dist
gulp.task('clean', function(){
  console.log('Cleaning...');
  return del('dist/*');
});

gulp.task('copy-index', function() {
  return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
})


// Injects styles and apps into index.html
gulp.task('inject', function () {
  
  console.log('Injecting...');
  
  // Inserting vendor JS
  var targetHTML = gulp.src('dist/index.html');
  var sourceJS = gulp.src('dist/js/*.js', {read: false});
 
  return targetHTML.pipe(inject(sourceJS, 
                           {starttag: '<!-- inject:js -->', 
                            relative: true}))
               .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
runSequence('clean',
            'images',
            'js',
            'copy-index',
            'inject',
            callback);
});

gulp.task('index2', function(callback) {
runSequence('copy-index', 
            'inject', 
            callback);
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/index.html', ['index2']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('gulpfile.js', ['build']);
});