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
   gulp.src([
   './node_modules/bodymovin/build/player/bodymovin.min.js'
    ])
    .pipe(gulp.dest('dist/js/'));

  return gulp.src([
    './src/js/titanic.js',
//    './node_modules/bodymovin/build/player/bodymovin.js'
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


// Injects styles and apps into index.html
gulp.task('index', function () {
  
  console.log('Injecting...');
  
  // Inserting vendor JS
  var targetHTML = gulp.src('index.html', {cwd: __dirname + '/src/'});
  var sourceJS = gulp.src('js/*.js', {read: false, cwd: __dirname + '/dist/'});
 
  return targetHTML.pipe(inject(sourceJS, 
                           {starttag: '<!-- inject:js -->', 
                            relative: true
                            }))
               .pipe(gulp.dest('./demo'));
});

gulp.task('build', function(callback) {
runSequence('clean',
            ['images', 'js'],
            'index',
            callback);
});


gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/index.html', ['index']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('gulpfile.js', ['build']);
});