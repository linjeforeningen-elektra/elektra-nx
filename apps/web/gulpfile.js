const gulp = require('gulp');
const gzip = require('gulp-gzip');

gulp.task('compress', function (cb) {
  gulp.src('../../dist/apps/web/browser/**/*.*').pipe(gzip()).pipe(gulp.dest('../../dist/apps/web/browser'));

  cb();
});
