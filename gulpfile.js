// gulpfile.js

const gulp = require('gulp');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const child = require('child_process');
const gutil = require('gulp-util');

const jsFiles = '_assets/**/*.js';
const vendorJsFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-youtube-embed/dist/angular-youtube-embed.min.js'
];
const vendorCssFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css'
];
const vendorFontFiles = [
    'node_modules/bootstrap/dist/fonts/*',
    'node_modules/font-awesome/fonts/*'
];

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('nvns.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('vendorJs', () => {
    return gulp.src(vendorJsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('nvns.vendor.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('vendorCss', () => {
    return gulp.src(vendorCssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('nvns.vendor.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copyVendorFonts', () => {
    return gulp.src(vendorFontFiles)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', () => {
    gulp.watch(jsFiles, ['js']);
    gulp.watch(vendorJsFiles, ['vendorJs']);
    gulp.watch(vendorCssFiles, ['vendorCss']);
    gulp.watch(vendorFontFiles, ['copyVendorFonts']);
});

gulp.task('jekyll', () => {
    const jekyll = child.spawn('bundle', ['exec',
        'jekyll',
        'serve',
        '--watch',
        '--incremental',
        '--drafts'
    ]);

    const jekyllLogger = (buffer) => {
    buffer.toString()
        .split(/\n/)
        .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);

});

gulp.task('default', [
    'js',
    'vendorJs',
    'vendorCss',
    'copyVendorFonts',
    'jekyll',
    'watch'
]);
