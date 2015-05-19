
var gulp = require('gulp'),
    karma = require('karma').server,
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    cssmin = require('gulp-cssmin'),
    minifyHTML = require('gulp-minify-html'),
    stylish = require('jshint-stylish'),
    path = require('path'),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    runSequence = require('run-sequence').use(gulp),
    nodemon = require('gulp-nodemon');

//builds less into css files and move them to release
gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('release/css'));
});


// Run test once and exit
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function (exitStatus) {
        done();
    });
});


// Watch for file changes and re-run tests on each change
gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, function (exitStatus) {
        done();
    });
});

// JSHint task
gulp.task('jshint', function () {
    gulp.src(['app/*.js', 'app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

//moves all the static content (images/* fonts/*)
gulp.task('static_content', function () {
    return gulp.src(['app/static_content/**/', 'app/static_content/*'])
        .pipe(gulp.dest('release/static_content'));
});

//creates the bundle file and bundle.js.map
gulp.task('js', function () {
    var bundle = function () {
        return browserify({
                entries: ['./app/index.js'],
                paths: ['./node_modules', '.js'],
                debug: true
            })
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./release/js/'));
    };

    return bundle();
});

//minifies the bundle file and annotates angular injected modules
gulp.task('uglify', function () {
    gulp.src('./release/js/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./release/js'));
});

//minifies the css generated
gulp.task('cssmin', function () {
    gulp.src('./release/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./release/css'));
});

//minifies the html views
gulp.task('minify-html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./release/views/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./release/views'));
});

// Views task
gulp.task('views', function () {
    //index should be moved separately
    gulp.src('./app/index.html')
        .pipe(gulp.dest('release/'));

    // Any other view files from /views
    gulp.src('./app/modules/**/*.html')
        .pipe(gulp.dest('release/views'));
});

//default task run it use: gulp
gulp.task('default', ['build', 'watch']);

// 1. gulp build -> builds the project
gulp.task('build', ['jshint', 'test', 'js', 'views', 'less', 'static_content']);

//2. gulp release -> then minifies the generated files into release
gulp.task('release', ['uglify', 'cssmin', 'minify-html']);

// builds and releases, in sequence
gulp.task('build:release', function () {
    runSequence(
        ['js', 'views', 'less', 'static_content'],
        ['uglify', 'cssmin', 'minify-html']
        );
});

// starts the node server.js
gulp.task('start-server', function () {
    nodemon({
        script: 'server.js',
        ext: 'js html'
    });
});

//builds, releases and starts the server
gulp.task('deploy', function () {
    runSequence(
        ['js', 'views', 'less', 'static_content'],
        ['uglify', 'minify-html'],
        'start-server'
        );
});

// Re-run the task when a file changes
gulp.task('watch', function () {
    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch(['app/*.js', 'app/**/*.js'], ['jshint', 'test', 'js']);
    gulp.watch(['app/modules/**/*', 'app/*.html'], ['views', 'static_content']);
});