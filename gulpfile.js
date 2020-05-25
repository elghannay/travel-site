// Initialize modules
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    postcss_import = require('postcss-import');




gulp.task('default', function done() {
    console.log("Hooray - you created a Gulp task.");
    done();
});

gulp.task('html', done => {
    console.log("Imagine something useful beingddddd done to your HTML here.");
    done();
});

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/style.css')
        .pipe(postcss([postcss_import(), cssvars(), nested(), autoprefixer()]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function () {

    gulp.watch('app/index.html', gulp.series('html'));

    gulp.watch('app/assets/styles/**/*.css', gulp.series('styles'));
    // trigger the task with "gulp watch"
});


