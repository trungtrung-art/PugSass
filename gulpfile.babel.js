import { series, parallel } from "gulp";

import server from "./_gulptask/server";

import pugTask from "./_gulptask/html";
import jsCore from "./_gulptask/plugin-js";
import cssCore from "./_gulptask/plugin-css";
import sassTask from "./_gulptask/css";
import jsTask from "./_gulptask/script";
import { cleanDist } from "./_gulptask/clean";
import { copyFonts, copyImages, copyFavicon } from "./_gulptask/copy";

exports.default = series(
    cleanDist,
    parallel(copyFavicon, copyImages, copyFonts),
    parallel(jsCore, cssCore),
    sassTask,
    jsTask,
    pugTask,
    server
);
