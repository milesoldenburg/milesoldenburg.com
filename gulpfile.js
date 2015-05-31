// Dependencies
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var w3cjs = require('gulp-w3cjs');

/**
 * Lints the config files
 */
gulp.task('lint:config', function(){
    return gulp.src('./gulpfile.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

/**
 * Lints lib js
 */
gulp.task('lint:lib', function(){
    return gulp.src(path.join(__dirname, 'lib/js/main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

/**
 * Runs style check on config files
 */
gulp.task('jscs:config', function(){
    return gulp.src(path.join(__dirname, 'gulpfile.js'))
        .pipe(jscs({
            configPath : '.jscsrc',
            fix : true
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Runs style check on lib js
 */
gulp.task('jscs:lib', function(){
    return gulp.src(path.join(__dirname, 'lib/js/main.js'))
        .pipe(jscs({
            configPath : '.jscsrc',
            fix : true
        }))
        .pipe(gulp.dest(path.join(__dirname, 'lib/js')));
});

/**
 * Validates HTML using W3C validation
 */
gulp.task('w3cjs', function(){
    gulp.src(path.join(__dirname, 'lib/index.html'))
        .pipe(w3cjs());
});

/**
 * Compiles LESS into CSS
 */
gulp.task('less', function(){
    return gulp.src(path.join(__dirname, 'lib/css/styles.less'))
        .pipe(less({
            paths : [path.join(__dirname, 'lib/css/styles.less')]
        }))
        .pipe(gulp.dest(path.join(__dirname, 'lib/css')));
});

/**
 * Watches for changes in LESS and then triggers the less task
 */
gulp.task('watch', function(){
    gulp.watch(path.join(__dirname, 'lib/css/styles.less'), ['less']);
});

/**
 * Runs the require.js build
 */
gulp.task('requirejs', shell.task([
    './node_modules/requirejs/bin/r.js -o requirejs-build.js'
]));

/**
 * Task to run all lint subtasks
 */
gulp.task('lint', ['lint:config', 'lint:lib', 'jscs:config', 'jscs:lib', 'w3cjs']);

/**
 * Default gulp task
 */
gulp.task('default', function(){
    runSequence(['lint', 'less'], 'requirejs');
});
