// Dependencies
var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackDevServer = require('webpack-dev-server');
var webpackGulp = require('gulp-webpack');
var w3cjs = require('gulp-w3cjs');

/**
 * Lints the config files
 */
gulp.task('lint:config', function(){
    return gulp.src([path.join(__dirname, 'gulpfile.js'), path.join(__dirname, 'webpack.config.js')])
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
    return gulp.src([path.join(__dirname, 'gulpfile.js'), path.join(__dirname, 'webpack.config.js')])
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
 * Creates a development server
 */
gulp.task('webpack-dev-server', ['less', 'watch'], function(){
    // Start a webpack-dev-server
    new webpackDevServer(webpack(webpackConfig), {
        contentBase : path.join(__dirname, 'lib'),
        debug : true,
        devtool : 'eval',
        quiet : false,
        stats : {
            colors : true
        }
    }).listen(8080, 'localhost');
});

/**
 * Builds the final optimized bundle
 */
gulp.task('webpack', function(){
    // Modify some webpack config options
    var config = Object.create(webpackConfig);
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());

    return gulp.src(path.join(__dirname, 'lib/js/main.js'))
        .pipe(webpackGulp(config))
        .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

/**
 * Copies files from lib to dist
 */
gulp.task('copy', function(){
    gulp.src(path.join(__dirname, 'lib/css/styles.css'))
        .pipe(gulp.dest(path.join(__dirname, 'dist/css')));

    gulp.src(path.join(__dirname, 'lib/docs/*.pdf'))
        .pipe(gulp.dest(path.join(__dirname, 'dist/docs')));

    gulp.src(path.join(__dirname, 'lib/fonts/*.*'))
        .pipe(gulp.dest(path.join(__dirname, 'dist/fonts')));

    gulp.src(path.join(__dirname, 'lib/images/*.*'))
        .pipe(gulp.dest(path.join(__dirname, 'dist/images')));

    gulp.src(path.join(__dirname, 'lib/index.html'))
        .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

/**
 * Cleans dist
 */
gulp.task('clean', function(){
    del([
        'dist/*',
        '!dist/.gitignore',
        '!dist/README.md'
    ]);
});

/**
 * Watches for changes in LESS and then triggers the less task
 */
gulp.task('watch', function(){
    gulp.watch(path.join(__dirname, 'lib/css/styles.less'), ['less']);
});

/**
 * Uploads the site
 */
gulp.task('scp', shell.task([
    'scp -r dist/* milesoldenburg@milesoldenburg.com:~/milesoldenburg.com'
]));

/**
 * Task to run all lint subtasks
 */
gulp.task('lint', ['lint:config', 'lint:lib', 'jscs:config', 'jscs:lib', 'w3cjs']);

/**
 * Builds the resume PDF
 */
gulp.task('resume', shell.task([
    'cd lib/docs && /usr/texbin/pdflatex MilesOldenburg_Resume.tex'
]));

/**
 * Monitor resume changes to build PDF
 */
gulp.task('watch:resume', function(){
    gulp.watch('./lib/docs/MilesOldenburg_Resume.tex', ['resume']);
});

/**
 * Default gulp task
 */
gulp.task('default', function(){
    runSequence('clean', ['lint', 'less', 'resume'], ['copy', 'webpack'], 'scp');
});
