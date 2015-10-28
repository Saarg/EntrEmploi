var gulp       = require('gulp');  
var less       = require('gulp-less');  
var watch      = require('gulp-watch');

/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./public/less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./public/less/styles.less' , ['compile-less']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['compile-less', 'watch-less']); 