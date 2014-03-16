var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    shell = require('gulp-shell');

var paths = {
  specRunner: 'spec/spec.runner.html',
  appFiles: './{lib,spec}/**/*.js'
};

var mochaPhantomJS = shell('mocha-phantomjs -R dot ' + paths.specRunner);

gulp.task('default', function () {
  gulp.run('watch');
});

gulp.task('spec', function () {
  gulp.src(paths.specRunner)
      .pipe(mochaPhantomJS);
})

gulp.task('watch', function () {
  watch({ glob: paths.appFiles })
    .pipe(plumber())
    .pipe(mochaPhantomJS);
});