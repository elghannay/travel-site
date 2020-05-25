var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    postcss_import = require('postcss-import'),
    browsersync = require('browser-sync').create();

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/style.css')
        .pipe(postcss([postcss_import(), cssvars(), nested(), autoprefixer()]))
        .pipe(gulp.dest('./app/temp/styles/')).pipe(browsersync.reload({ stream: true }));
});

gulp.task('watch', function () {
    browsersync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });
    gulp.watch('app/index.html').on('change', browsersync.reload);
    gulp.watch('app/assets/styles/**/*.css').on('change', gulp.series('styles'));
});