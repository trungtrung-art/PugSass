import del from "del";

export const cleanDist = () => {
    return del("dist");
};

export const cleanImages = () => {
    return del("dist/img");
};

module.exports = {
    cleanDist,
    cleanImages,
};
