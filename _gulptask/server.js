import { watch, series, parallel } from "gulp";
import sync from "browser-sync";

import jsCore from "./plugin-js";
import jsTask from "./script";

import pugTask from "./html";

import cssCore from "./plugin-css";
import sassTask from "./css";

import { copyImages } from "./copy";

import { cleanImages } from "./clean";

const jsSRC = "./src/js/**/*.js";

const cssSRC = "./src/components/**/**.sass";

const imgSRC =
    "./src/img/**/**.{svg,png,jpg,speg,gif,jpge,PNG,JPGE,JPG,SVG,GIF,SPEG,mp4}";

export const server = () => {
    sync.init({
        notify: true,
        server: {
            baseDir: "dist",
        },
        port: 8000,
    });

    watch([jsSRC], series(jsTask));

    watch(["src/**/**.pug"], series(pugTask));

    watch([cssSRC], series(sassTask));

    watch([imgSRC], series(cleanImages, copyImages));

    watch(["config.json"], parallel(jsCore, cssCore));

    watch(["dist"]).on("change", sync.reload);
};

module.exports = server;
