import { src, dest } from "gulp";
import { readFileSync } from "graceful-fs";

const imgSRC =
    "./src/img/**/**.{svg,png,jpg,speg,gif,jpge,PNG,JPGE,JPG,SVG,GIF,SPEG,mp4}";
const imgDIST = "./dist/img/";

const faviconSRC = "./src/**.ico";
const faviconDIST = "./dist/";

export const copyImages = () => {
    return src(imgSRC).pipe(dest(imgDIST));
};

export const copyFonts = () => {
    let url = JSON.parse(readFileSync("config.json"));
    return src(url.font, {
        allowEmpty: true,
    }).pipe(dest("dist/fonts"));
};

export const copyFavicon = () => {
    return src(faviconSRC, {
        allowEmpty: true,
    }).pipe(dest(faviconDIST));
};

module.exports = {
    copyFonts,
    copyImages,
    copyFavicon,
};
