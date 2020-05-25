gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/style.css')
        .pipe(postcss([postcss_import(), cssvars(), nested(), autoprefixer()]))
        .pipe(gulp.dest('./app/temp/styles/')).pipe(browsersync.reload({ stream: true }));
});