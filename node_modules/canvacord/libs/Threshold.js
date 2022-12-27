const Canvas = require("@napi-rs/canvas");

module.exports = async (img, amount = 50) => {
    const image = await Canvas.loadImage(img);
    const canvas = await Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        var r = imgData.data[i];
        var g = imgData.data[i + 1];
        var b = imgData.data[i + 2];
        var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= amount) ? 255 : 0;
        imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v
    }

    ctx.putImageData(imgData, 0, 0);

    return canvas.encode("png");
};