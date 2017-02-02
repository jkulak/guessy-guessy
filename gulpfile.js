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
    uglify = require('gulp-uglify');

// Configuration
const root = {
    src: 'src/',
    dest: 'docs/',
};

const src = {
    sass: root.src + 'sass/',
    css: root.src + 'style/',
    scripts: root.src + 'app/',
    images: root.src + 'imgs/',
    tmpl: root.src
};

const dest = {
    css: root.dest + 's/',
    scripts: root.dest + 'js/',
    images: root.dest + 'imgs/',
    tmpl: root.dest
};

// Tasks
gulp.task('clean', () => {
    return del(root.dest + '**');
});

gulp.task('update-html', () => {
    gulp.src(src.tmpl + '*.html')
        .pipe(htmlreplace({
            css: 's/all.css',
            js: 'js/all.js'
        }))
        .pipe(gulp.dest(dest.tmpl));
});

gulp.task('move-resources', () => {
    return gulp.src(root.src + '**/*.json')
        .pipe(gulp.dest(root.dest));
});

gulp.task('images', () => {
    return gulp.src(src.images + '**/*.png')
        .pipe(gulp.dest(dest.images));
});

gulp.task('sass', () => {
    return gulp.src(src.sass + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css));
});

gulp.task('styles', ['sass'], () => {
    return gulp.src(src.css + '**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.css));
});

gulp.task('scripts', () => {
    return gulp.src([src.scripts + 'game.js', src.scripts + '**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.scripts))
});

gulp.task('build', ['clean'], () => {
    gulp.start('styles', 'scripts', 'images', 'update-html', 'move-resources');
});

// Watch
gulp.task('watch', () => {
    // Create LiveReload server
    livereload.listen();

    gulp.watch([
        'views/**/*.html',
        src.scripts + '**/*.js',
        src.tmpl + '**/*.html',
        src.css + '**/*.css'
    ], event => {
        console.log('💾 ' + event.path + ' has been ' + event.type);
        return gulp.src(event.path).pipe(livereload());
    });

    gulp.watch(src.sass + '**/*.scss', ['sass']);
});
