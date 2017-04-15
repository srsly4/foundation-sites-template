var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function() {
    gulp.watch(['scss/**/*.scss'], ['sass']);
});

var js_vendors = [
    'bower_components/jquery/dist/jquery.min.js',
    // 'bower_components/slick-carousel/slick/slick.min.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/dist/js/foundation.js'
];

gulp.task('setup-vendor', function(){
    return gulp.src(js_vendors)
        .pipe(gulp.dest('./js'))
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest('./js'))
        .pipe($.rename('vendor.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./js'))
});