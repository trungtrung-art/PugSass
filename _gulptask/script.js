import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import uglifyBabel from "gulp-terser";
import babel from "gulp-babel";
import rename from "gulp-rename";
import sourcemap from "gulp-sourcemaps";

const jsSRC = "./src/js/**/*.js";
const jsDIST = "./dist/js/";

export const jsTask = () => {
    return src([jsSRC])
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(uglifyBabel())
        .pipe(rename("main.min.js"))
        .pipe(sourcemap.write("."))
        .pipe(dest(jsDIST));
};

module.exports = jsTask;
