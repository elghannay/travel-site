var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sass = require("gulp-sass"),
    cssnano = require("cssnano"),
    svgmin = require('gulp-svgmin'),
    browsersync = require('browser-sync').create();
sass.compiler = require('node-sass');

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/style.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer('last 2 versions'), cssnano()]))
        .pipe(gulp.dest('./app/temp/styles/'))
        .pipe(browsersync.stream());
    // .pipe(browsersync.reload({ stream: true }));
});


gulp.task('svgmin', function () {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgmin(
            {
            plugins: [{
                removeViewBox: false
            }, {
                removeComments: false
            }, {
            }, {
                removeUselessStrokeAndFill: false
            }, {
                removeViewBox: false
            }, {
                cleanupNumericValues: {
                    floatPrecision: 2
                }
            }, {
                convertColors: {
                    names2hex: false,
                    rgb2hex: false
                }
            }]
        }))
        .pipe(gulp.dest('./app/assets/images/icons/optimized'))
});


gulp.task('watch', function () {
    browsersync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    gulp.watch('app/index.html').on('change', browsersync.reload);
    gulp.watch('app/assets/styles/**/*.scss').on('change', gulp.series('styles'));
});