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
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify');

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

gulp.task('resources', () => {
    return gulp.src('src/dict-a.json')
        .pipe(gulp.dest(dist_dir));
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
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            }
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_dir))
        .pipe(livereload());
});

gulp.task('build', ['clean'], () => {
    gulp.start('sass', 'styles', 'scripts', 'update-html-dependencies', 'resources');
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
