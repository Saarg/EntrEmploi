var gulp       = require('gulp');
var sass       = require('gulp-sass');
var watch      = require('gulp-watch');
var livereload = require('gulp-livereload');
var minify     = require('gulp-minify-css');
var concat     = require('gulp-concat');

// LESS
gulp.task('compile-sass', function() {
    gulp.src('./public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
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
    gulp.watch('./public/scss/*.scss' , ['compile-sass']);
    gulp.watch('./public/**/*.html', ['html']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['compile-sass', 'html', 'watch']);
