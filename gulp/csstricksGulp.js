const gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    del = require("del"),
    babel = require("gulp-babel"),
    minify = require("gulp-minify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    replace = require("gulp-replace"),
    svgSymbols = require("gulp-svg-symbols"),
    svgmin = require("gulp-svgmin");

const paths = {
    styles: {
        src: ["./scss/*.scss", "./art-direction/*.scss"],
        dest: "./css/"
    },
    scripts: {
        src: ["./js/*.js", "./js/libs/*.js", "!./js/min/*.js"],
        dest: "./js/min"
    },
    svg: {
        src: "./icons/*.svg"
    },
    php: {
        src: ["./*.php", "./ads/*.php", "./art-direction/*.php", "./parts/**/*.php"]
    },
    ads: {
        src: "./ads/*.php"
    }
};

/* STYLES */
function doStyles(done) {
    return gulp.series(style, moveMainStyle, deleteOldMainStyle, done => {
        cacheBust("./header.php", "./");
        done();
    })(done);
}

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function moveMainStyle() {
    return gulp.src("./css/style.css").pipe(gulp.dest("./"));
}

function deleteOldMainStyle() {
    return del("./css/style.css");
}
/* END STYLES */

/* SCRIPTS */
function doScripts(done) {
    return gulp.series(
        preprocessJs,
        concatJs,
        minifyJs,
        deleteArtifactJs,
        reload,
        done => {
            cacheBust("./parts/footer-scripts.php", "./parts/");
            done();
        }
    )(done);
}

function preprocessJs() {
    return gulp
        .src(paths.scripts.src)
        .pipe(
            babel({
                presets: ["@babel/env"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            })
        )
        .pipe(gulp.dest("./js/babel/"));
}

function concatJs() {
    return gulp
        .src([
            "js/libs/jquery.lazy.js",
            "js/libs/jquery.fitvids.js",
            "js/libs/jquery.resizable.js",
            "js/libs/prism.js",
            "js/babel/highlighting-fixes.js",
            "js/babel/global.js"
        ])
        .pipe(concat("global-concat.js"))
        .pipe(gulp.dest("./js/concat/"));
}

function minifyJs() {
    return gulp
        .src(["./js/babel/*.js", "./js/concat/*.js"])
        .pipe(
            minify({
                ext: {
                    src: ".js",
                    min: ".min.js"
                }
            })
        )
        .pipe(gulp.dest(paths.scripts.dest));
}

function deleteArtifactJs() {
    return del([
        "./js/babel",
        "./js/concat",
        "./js/min/*.js",
        "!./js/min/*.min.js"
    ]);
}
/* END SCRIPTS */

/* SVG */
function doSvg() {
    return gulp
        .src(paths.svg.src)
        .pipe(svgmin())
        .pipe(
            svgSymbols({
                templates: ["default-svg"],
                svgAttrs: {
                    width: 0,
                    height: 0,
                    display: "none"
                }
            })
        )
        .pipe(rename("icons/sprite/icons.php"))
        .pipe(gulp.dest("./"));
}
/* END SVG */

/* GENERIC THINGS */
function cacheBust(src, dest) {
    var cbString = new Date().getTime();
    return gulp
        .src(src)
        .pipe(
            replace(/cache_bust=\d+/g, function () {
                return "cache_bust=" + cbString;
            })
        )
        .pipe(gulp.dest(dest));
}

function reload(done) {
    browserSync.reload();
    done();
}

function watch() {
    browserSync.init({
        proxy: "csstricks.local"
    });
    gulp.watch(paths.styles.src, doStyles);
    gulp.watch(paths.scripts.src, doScripts);
    gulp.watch(paths.svg.src, doSvg);
    gulp.watch(paths.php.src, reload);
    gulp.watch(paths.ads.src, done => {
        cacheBust("./js/global.js", "./js/");
        done();
    });
}

gulp.task("default", watch);