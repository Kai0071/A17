const Canvas = require("@napi-rs/canvas");

module.exports = async (img) => {
    const image = await Canvas.loadImage(img);
    const canvas = await Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i + 1] = 255 - imgData.data[i + 1];
        imgData.data[i + 2] = 255 - imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);

    return canvas.encode("png");
};