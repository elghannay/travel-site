var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sass = require("gulp-sass"),
    cssnano = require("cssnano"),
    svgmin = require('gulp-svgmin'),
    // webpack = require('webpack-stream'),
    webpack = require('webpack'),
    // compiler = require('webpack'),
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


///////////////////////////////////////////////
////////////////    webpack    ////////////////
///////////////////////////////////////////////

gulp.task('scripts', function() {
  webpack(require('./webpack.config'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    
  });
});

// never use [] as parameters or dependencies they are deprecated since version 3
// gulp.task('default', gulp.series('server', 'watch')); gulp 4
// gulp.task('default', ['server', 'watch']);   gulp 3 

///////////////////////////////////////////////
////////////////    webpack    ////////////////
///////////////////////////////////////////////

gulp.task('watch', function () {
    browsersync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    gulp.watch('app/index.html').on('change', browsersync.reload);
    gulp.watch('app/assets/scripts/**/*.js').on('change', gulp.series('scripts'));
    gulp.watch('app/assets/scripts/**/*.js').on('change', browsersync.reload);
    gulp.watch('app/assets/styles/**/*.scss').on('change', gulp.series('styles'));
});