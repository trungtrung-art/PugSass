import { src, dest } from "gulp";
import sass from "gulp-sass";
import concat from "gulp-concat";
import sourcemap from "gulp-sourcemaps";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import cssSort from "css-declaration-sorter";
import autoprefixer from "autoprefixer";

const styleSRC = "./src/components/_core/**.sass";
const _styleSRC = "./src/components/_core/_**.sass";
const styleGloSRC = "./src/components/_global/**.sass";
const styleComSRC = "src/components/**/**.sass";
const styleDIST = "./dist/css/";

export const sassTask = () => {
    return src([styleSRC, _styleSRC, styleGloSRC, styleComSRC])
        .pipe(sourcemap.init())
        .pipe(concat("main.sass"))
        .pipe(sass().on("error", sass.logError))
        .pipe(
            postcss([
                autoprefixer({
                    browsers: ["last 4 version", "IE 9"],
                    cascade: false,
                }),
                cssnano(),
                cssSort({
                    order: "concentric-css",
                }),
            ])
        )
        .pipe(sourcemap.write("."))
        .pipe(dest(styleDIST));
};

module.exports = sassTask;
