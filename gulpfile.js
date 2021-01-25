const { series, parallel, src, dest, watch } = require( 'gulp' );
const { readFileSync } = require('graceful-fs');
const del = require('del');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const pug = require( 'gulp-pug' )
const autoprefixer = require( 'gulp-autoprefixer' );
const sync = require( 'browser-sync' );
const browserSync = require('browser-sync');

const styleSRC = './src/scss/*.scss';
const styleDIST = './dist/css/';

const jsSRC = './src/js/**/*.js'
const jsDIST = './dist/js/';

const imgSRC = './src/img/**/*.{svg,gif,png,jpg,jpeg}'
const imgChildSRC = './src/img/*.{svg,gif,png,jpg,jpeg}'
const imgDIST = './dist/img/'

const temSRC = './src/**/**.pug'

const cleanDist = () => {
    return del("dist");
}

const cleanImages = () => {
    return del("dist/img");
}

const stylesCore = () => {
    let url = JSON.parse(readFileSync("config.json"))
    return src(url.css, {
        allowEmpty: true
    })
        .pipe(plumber())
        .pipe(concat("core.min.css"))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream())
}

const scriptCore = () => {
    let url = JSON.parse(readFileSync("config.json"))
    return src(url.js, {
        allowEmpty: true
    })
        .pipe(plumber())
        // .pipe(concat("core.min.js"))
        .pipe(uglify())
        .pipe(dest("dist/js/default"))
        .pipe(browserSync.stream())
}

const styles = (cb) => {
    src(styleSRC)
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'expanded'
        }).on("error", sass.logError))
        .pipe(autoprefixer(
            {
                cascade: false
            })
        )
        .pipe(dest(styleDIST))
        .pipe(browserSync.stream())
    cb()    
}

const scripts = (cb) => {
    src(jsSRC)
        .pipe(plumber())
        .pipe(dest(jsDIST))
        .pipe(browserSync.stream())
    cb()
}

const templates = () => {
    return src([
            "src/pages/*.pug",
            "!src/pages/\_*.pug"
        ])
        .pipe(plumber())
        .pipe(pug({
            pretty: "\t",

        }))
        .pipe(dest("dist"))
        .pipe(browserSync.stream())
}

const images = () => {
    return src([ imgSRC, imgChildSRC ])
        .pipe(dest(imgDIST))
        .pipe(browserSync.stream())
}

const fonts = () => {
    let url = JSON.parse(readFileSync("config.json"))
    return src(url.font, {
            allowEmpty: true
        })
        .pipe(dest("dist/fonts"))
        .pipe(browserSync.stream())
}

const server = () => {
    sync.init({
        notify: true,
        server: {
            baseDir: "dist",
        },
        port: 9999
    });

    watch([
        jsSRC
    ], series(scripts));

    watch([
        styleSRC
    ], series(styles));

    watch([
        temSRC
    ], series(templates));

    watch([
        "config.json"
    ], series( scriptCore, stylesCore));

    watch([
        "src/img/**/**.{svg,png,jpg,speg,gif}"
    ], series(cleanImages, images));
}

exports.default = series(
    cleanDist,
    styles,
    scripts,
    templates,
    parallel(
        images,
        fonts
    ),
    parallel(
        stylesCore,
        scriptCore
    ),
    server
)