var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');


gulp.task('default', function(callback) {
runSequence('build', 
            'watch', 
             callback);
});

// JS for bodymovin and jQuery
gulp.task('vendor-scripts', function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bodymovin/build/player/bodymovin.min.js'
    ])
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

// Copies index to /dist
gulp.task('copy-index', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

// Injects styles and apps into index.html
gulp.task('index', ['copy-index'], function () {
  console.log('Injecting...');
  var target = gulp.src('dist/index.html');
  var vendorJSSource = gulp.src('dist/js/*.js', {read: false});
 
  // Inserting vendor JS
  return target.pipe(inject(vendorJSSource, 
                           {starttag: '<!-- inject:js -->', 
                            relative: true}))
               .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
runSequence('clean',
            'vendor-scripts',
            'images',
            'index',
            callback);
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['app-scripts']);
  gulp.watch('src/index.html', ['copy-index'], 'index');
  gulp.watch('src/images/*', ['images']);
  gulp.watch('gulpfile.js', ['build']);
});