const gulp = require('gulp');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('js', () => {
  return gulp.src('src/*.js')
    .pipe(terser())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('css', () => {
  return gulp.src('src/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('assets/css'));
});

const { rmSync } = require('fs');
const path = require('path');

gulp.task('clean', cb => {
  try {
    rmSync('dist', { recursive: true, force: true });
    cb();
  } catch (e) {
    cb();
  }
});

gulp.task('copy-html', () => {
  return gulp.src(['*.html', 'sw.js', 'manifest.json', '.htaccess'])
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', () => {
  return gulp.src(['assets/**/*', '!assets/images/*.{jpg,png,svg,webp}'])
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('images', () => {
  return gulp.src('assets/images/*.{jpg,png,svg,webp}')
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'copy-html', 'copy-assets', 'images')));
gulp.task('default', gulp.task('build'));

