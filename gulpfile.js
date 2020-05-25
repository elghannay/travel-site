/////////////////////////////////////////////
/************ Initialize modules *********/
/////////////////////////////////////////////
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    postcss_import = require('postcss-import'),
    browserSync = require('browser-sync').create();
// we want to import only the create() method from that package.

/////////////////////////////////////////////
/************  function definitions *********/
/////////////////////////////////////////////

function reload(done) {
    server.reload();
    done();
}

// object for defining the source and destination folder
const paths = {
    scripts: {
        src: 'src/scripts/*.js',
        dest: 'dist/scripts/',
    },
    html: 'app/index.html',
    css: {
        src: './app/assets/styles/style.css',
        dest: './app/temp/styles'
    }
};

///////////////////////////////////////
/************ creating tasks *********/
///////////////////////////////////////


gulp.task('default', function done() {
    console.log("Hooray - you created a Gulp task.");
    done();
});

gulp.task('styles', function () {
    return gulp.src(paths.css.src)
        // the order on the pipe does matter.
        .pipe(postcss([postcss_import(), cssvars(), nested(), autoprefixer()]))
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task('watch', function () {
    // initializing the server!
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch(paths.html).on('change', browserSync.reload);
    // the line below cause watch to be stuck at reloading browser.
    // gulp.watch('app/assets/styles/**/*.css', gulp.series('styles', browserSync.reload));
    gulp.watch('app/assets/styles/**/*.css', gulp.series('styles', function (done) {
        browserSync.reload();
        done();
    }));
    // trigger the task with "gulp watch"
});


