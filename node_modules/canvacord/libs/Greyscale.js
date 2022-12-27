const Canvas = require("@napi-rs/canvas");

module.exports = async (img) => {
    const image = await Canvas.loadImage(img);
    const canvas = await Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
        imgData.data[i] = brightness;
        imgData.data[i + 1] = brightness;
        imgData.data[i + 2] = brightness;
    }

    ctx.putImageData(imgData, 0, 0);

    return canvas.encode("png");
};