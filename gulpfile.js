'use strict';

var gulp = require('gulp');

var del = require('del');

var revall = require('gulp-rev-all');
var ghPages = require('gulp-gh-pages');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jshint = require('gulp-jshint');

var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');


//
//  Housekeeping
//

gulp.task('clean', function (cb) {
  del([
    'dist'
  ], cb);
});

gulp.task('jshint', function () {
  return gulp.src(['gulpfile.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('serve', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch(['*.html', 'assets/css/**/*.css', 'assets/img/**/*', 'assets/js/**/*.js'], {cwd: 'src'}, reload);
});

gulp.task('serve:dist', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['src/assets/**/*.{eot,ttf,woff}'], ['copyAssets', reload]);
  gulp.watch(['src/*.html'], ['html', reload]);
  gulp.watch(['src/assets/**/*.css'], ['css', reload]);
  gulp.watch(['src/assets/**/*.{gif,ico,jpg,jpeg,png,svg}'], ['images', reload]);
  gulp.watch(['src/assets/**/*.js'], ['js', reload]);
});

//
//  Copy as-is files
//
function copyBase () {
  return gulp.src([
    'src/CNAME',
    'src/humans.txt'
  ])
    .pipe(gulp.dest('dist'));
}

function copyAssets () {
  return gulp.src([
    'src/assets/**/*.{eot,ttf,woff}'
  ])
    .pipe(gulp.dest('dist/assets'));
}

function copyPluginJs () {
  return gulp.src([
    'src/assets/plugins/**/*.js'
  ])
    .pipe(gulp.dest('dist/assets/plugins'));
}

//
//  Static asset optimization
//
function optimizeCss () {
  return gulp.src('src/assets/**/*.css')
    .pipe(csso())
    .pipe(gulp.dest('dist/assets'));
}

function optimizeHtml () {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
}

function optimizeImages () {
  return gulp.src('src/assets/**/*.{gif,ico,jpg,jpeg,png,svg}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/assets'));
}

function optimizeJs () {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
}

gulp.task('copyBase', copyBase);
gulp.task('copyAssets', copyAssets);
gulp.task('copyPluginJs', copyPluginJs);
gulp.task('css', optimizeCss);
gulp.task('html', optimizeHtml);
gulp.task('images', optimizeImages);
gulp.task('js', optimizeJs);

//
//  Production build
//
var buildDeps = ['clean', 'jshint'];

gulp.task('copyBase:build', buildDeps, copyBase);
gulp.task('copyAssets:build', buildDeps, copyAssets);
gulp.task('copyPluginJs:build', buildDeps, copyPluginJs);
gulp.task('css:build', buildDeps, optimizeCss);
gulp.task('html:build', buildDeps, optimizeHtml);
gulp.task('images:build', buildDeps, optimizeImages);
gulp.task('js:build', buildDeps, optimizeJs);

gulp.task('build', [
          'copyBase:build',
          'copyAssets:build',
          'copyPluginJs:build',
          'css:build', 
          'html:build', 
          'images:build', 
          'js:build'
  ]);

//
//  Deploy to Github Pages
//
gulp.task('deploy', ['build'], function () {
  return gulp.src(['dist/**'])
    .pipe(revall({ ignore: [
      /^\/favicon.ico$/g, 
      /^\/index.html/g,
      /^\/CNAME/g,
      /^\/humans.txt/g
    ]}))
    .pipe(ghPages());
});

// Just build by default
gulp.task('default', ['build']);
