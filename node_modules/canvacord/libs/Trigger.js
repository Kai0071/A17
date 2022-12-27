const Canvas = require("@napi-rs/canvas");
const { GifEncoder } = require("@skyra/gifenc");

module.exports = async (image, TRIGGERED) => {
    const base = await Canvas.loadImage(TRIGGERED);
    const img = await Canvas.loadImage(image);
    const GIF = new GifEncoder(256, 310);
    const stream = GIF.createReadStream();
    GIF.start();
    GIF.setRepeat(0);
    GIF.setDelay(15);
    const canvas = Canvas.createCanvas(256, 310);
    const ctx = canvas.getContext("2d");
    const BR = 30;
    const LR = 20;
    let i = 0;
    while (i < 9) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            Math.floor(Math.random() * BR) - BR,
            Math.floor(Math.random() * BR) - BR,
            256 + BR,
            310 - 54 + BR
        );
        ctx.drawImage(
            base,
            Math.floor(Math.random() * LR) - LR,
            310 - 54 + Math.floor(Math.random() * LR) - LR,
            256 + LR,
            54 + LR
        );
        // ctx.fillStyle = "#FF000011";
        // ctx.fillRect(0, 0, 256, 310);
        GIF.addFrame(ctx);
        i++;
    }
    GIF.finish();
    return streamToBuffer(stream);
};

function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const data = [];

        stream.on("data", c => data.push(c));
        stream.on("end", () => resolve(Buffer.concat(data)));
        stream.on("error", reject);
    })
}