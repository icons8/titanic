var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");


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
    .pipe(concat('titanic.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))

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


// Injects styles and apps into index.html
gulp.task('index', function () {
  
  console.log('Injecting...');

  gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
  
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
            'index',
            callback);
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['app-scripts']);
  gulp.watch('src/index.html', ['index']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('gulpfile.js', ['build']);
});