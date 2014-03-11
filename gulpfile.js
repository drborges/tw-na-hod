var gulp = require('gulp'),
    shell = require('gulp-shell'),
    lr = require('tiny-lr'),
    server = lr();

gulp.task('default', function () {
  gulp.run('watch');
});

gulp.task('spec', function () {
  return gulp.src('spec/spec.runner.html')
    .pipe(shell('mocha-phantomjs -R dot <%= file.path %>'))
})

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

    gulp.watch('./{lib,spec}/**/*.js', function() {
      gulp.run('spec');
    });
  });
});