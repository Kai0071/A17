const Canvas = require("@napi-rs/canvas");

module.exports = async (img) => {
    const image = await Canvas.loadImage(img);
    const canvas = await Canvas.createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
        imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
        imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
    }

    ctx.putImageData(imgData, 0, 0);

    return canvas.encode("png");
}