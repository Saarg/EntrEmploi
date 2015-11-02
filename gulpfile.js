var gulp       = require('gulp');  
var less       = require('gulp-less');  
var watch      = require('gulp-watch');
var livereload = require('gulp-livereload');
var minify     = require('gulp-minify-css');
var concat     = require('gulp-concat');

// LESS
gulp.task('compile-less', function() {  
  gulp.src('./public/less/*.less')
  .pipe(less())
  .pipe(minify())
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./public/css/'))
  .pipe(livereload());
});

// HTML
gulp.task('html', function() {
    return gulp.src([
        './public/**/*.html'
    ])
    .pipe(livereload());
});

/* Task to watch less changes */
gulp.task('watch', function() { 
    livereload.listen(); 
    gulp.watch('./public/less/*.less' , ['compile-less']);
    gulp.watch('./public/**/*.html', ['html']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['compile-less', 'html', 'watch']); 