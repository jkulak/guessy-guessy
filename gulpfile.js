'use strict';

const gulp = require('gulp'),
    // rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    livereload = require('gulp-livereload'),
    htmlreplace = require('gulp-html-replace');

gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'images', 'scripts');
});

gulp.task('update-html-dependencies', () => {
    gulp.src('lib/templates/*.html')
        .pipe(htmlreplace({
            'css': '/s/css/main.min.css',
            'js': '/s/js/main.min.js'
        }));
});

gulp.task('styles', () => {
    return gulp.src('public/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(livereload());
});

gulp.task('scripts', () => {
    return true;
});

gulp.task('images', () => {
    return gulp.src('public/images/**/*')
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(livereload());
});

gulp.task('clean', () => {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('build-for-production', ['clean'], () => {
    gulp.start('styles', 'images', 'update-html-dependencies');
});

// Watch
gulp.task('watch', () => {

    let onChange = function (event) {
        console.log('File ' + event.path + ' has been ' + event.type);
    };

    // Create LiveReload server
    livereload.listen();

    // Watch .css files
    gulp.watch('public/css/*.css', ['styles']).on('change', onChange);

    // Watch .js files
    gulp.watch('public/js/*.js', ['scripts']).on('change', onChange);

    // Watch image files
    gulp.watch('public/images/*', ['images']).on('change', onChange);
});
