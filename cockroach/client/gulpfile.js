
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    replace = require('gulp-replace'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    // browserSync = require('browser-sync'),
    ngannotate = require('gulp-ng-annotate'),
    del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/src/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('usemin', ['jshint'], function () {
  return gulp.src('./app/**/*.html')
    .pipe(usemin({
      css:[minifycss(),rev()],
      js: [ngannotate(),uglify(),rev()]
    }))
    // .pipe(replace('http://localhost:3000/', 'http://iwillgo.mybluemix.net/')) // Replace baseURL from local to production
    .pipe(gulp.dest('../public/'));
});


// Images
gulp.task('imagemin', function() {
  return del(['../public/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('../public/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['../public/src'], {force: true})
  .then(del(['../public/styles'], {force: true}));
});

gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('../public/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('../public/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {

  // Watch .js files
  gulp.watch('{app/src/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
    
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

// gulp.task('browser-sync', ['default'], function () {
//    var files = [
//       'app/**/*.html',
//       'app/styles/**/*.css',
//       'app/images/**/*.png',
//       'app/src/**/*.js',
//       '../public/**/*'
//    ];

//    browserSync.init(files, {
//       server: {
//          baseDir: "dist",
//          index: "index.html"
//       }
//    });  
    
//   // Watch any files in ../public/, reload on change
//   gulp.watch(['../public/**']).on('change', browserSync.reload);
    
// });

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});