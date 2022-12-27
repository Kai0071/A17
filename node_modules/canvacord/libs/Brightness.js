const Canvas = require("@napi-rs/canvas");

module.exports = async (img, amount) => {
    const image = await Canvas.loadImage(img);
    const canvas = await Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] += amount;
        imgData.data[i + 1] += amount;
        imgData.data[i + 2] += amount;
    }

    ctx.putImageData(imgData, 0, 0);

    return canvas.encode("png");
};