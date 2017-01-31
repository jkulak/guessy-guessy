'use strict';

// Dependencies
const gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    livereload = require('gulp-livereload'),
    htmlreplace = require('gulp-html-replace'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

// Configuration
const dist_dir = 'build/';

gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'scripts');
});

gulp.task('clean', () => {
    return del(dist_dir);
});

gulp.task('update-html-dependencies', () => {
    gulp.src('src/index.html')
        .pipe(htmlreplace({
            css: 'all.css',
            js: 'all.js'
        }))
        .pipe(gulp.dest(dist_dir));
});

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style'));
});

gulp.task('styles', () => {

    return gulp.src('src/style/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_dir))
        .pipe(livereload());
});

gulp.task('scripts', () => {
    // use babel to compile es6 -> ecma 2015
    // concat all files?
    // add source maps
    return gulp.src('src/app/**/*.js')
        .pipe(gulp.dest(dist_dir))
        .pipe(livereload());
});

gulp.task('build-for-production', ['clean'], () => {
    gulp.start('sass', 'styles', 'scripts', 'update-html-dependencies');
});

// Watch
gulp.task('watch', () => {

    let onChange = function (event) {
        console.log('File ' + event.path + ' has been ' + event.type);
    };

    // Create LiveReload server
    livereload.listen();
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/style/**/*.css', ['styles']).on('change', onChange);
    gulp.watch('src/app/**/*.js', ['scripts']).on('change', onChange);
});
