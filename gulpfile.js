// gulpfile.js

const gulp = require('gulp');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const child = require('child_process');
const gutil = require('gulp-util');

const lessFiles = '_assets/**/*.less';
const jsFiles = '_assets/**/*.js';

gulp.task('css', () => {
    gulp.src(lessFiles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('nvns.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', () => {
    gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('nvns.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', () => {
    gulp.watch(lessFiles, ['css']);
    gulp.watch(jsFiles, ['js']);
});

gulp.task('jekyll', () => {
    const jekyll = child.spawn('jekyll', ['serve',
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

gulp.task('default', ['css', 'js', 'jekyll', 'watch']);

