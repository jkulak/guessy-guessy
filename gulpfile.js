'use strict';

// Dependencies
const gulp = require('gulp'),
    // del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    livereload = require('gulp-livereload'),
    htmlreplace = require('gulp-html-replace'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

// Configuration
const dist_dir = 'src/dist/';

gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'scripts');
});

gulp.task('update-html-dependencies', () => {
    gulp.src('lib/templates/*.html')
        .pipe(htmlreplace({
            'css': '/s/css/main.min.css',
            'js': '/s/js/main.min.js'
        }));
});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style'));
});

gulp.task('styles', () => {

    return gulp.src('src/style/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_dir))
        .pipe(livereload());
});

gulp.task('scripts', () => {
    return gulp.src('src/app/**/*.js')
        .pipe(gulp.dest(dist_dir))
        .pipe(livereload());
});

gulp.task('build-for-production', ['clean'], () => {
    gulp.start('styles', 'scripts', 'update-html-dependencies');
});

// Watch
gulp.task('watch', () => {

    let onChange = function (event) {
        console.log('File ' + event.path + ' has been ' + event.type);
    };

    // Create LiveReload server
    livereload.listen();

    // Watch .sass files
    gulp.watch('src/sass/**/*.scss', ['sass']);

    // Watch .css files
    gulp.watch('src/style/**/*.css', ['styles']).on('change', onChange);

    // Watch .js files
    gulp.watch('src/app/**/*.js', ['scripts']).on('change', onChange);
});
