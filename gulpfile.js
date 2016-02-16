var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
      gulp.start('sass');
      gulp.start('compress');
});

gulp.task('sass', function () {
      gulp.src('./scss/*.scss')
         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
         .pipe(gulp.dest('./static/css'));
});

gulp.task('compress', function() {
      return gulp.src('js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('static/js'));
});

gulp.task('watch', function() {
      gulp.watch('./scss/*.scss', ['sass']);
      gulp.watch('./js/*.js', ['compress']);
});



