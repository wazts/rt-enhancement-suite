/**
 * @author Kyle Wagner
 * @description The gulp script for doing various things. SCSS mostly.
 */
 
// --- Require
var gulp = require('gulp');
var sass = require('gulp-sass');


// --- Globals
var sassInput = './../sass/**/*.scss';
var cssOutput = './../css/';

// --- Functions

/**
 * Process SCSS
 */
gulp.task('styles', function() {
    gulp.src(sassInput)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssOutput));
});

// --- Default
gulp.task('default', ['styles']);
gulp.watch('../sass/**/*.scss',['styles']);