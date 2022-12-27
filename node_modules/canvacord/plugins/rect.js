module.exports = (ctx, x, y, height, width, color, stroke = false, lineWidth = 1) => {
    if (!ctx) throw new Error("Missing canvas context!");
    if (isNaN(x)) throw new Error(`Expected height to be a number, received ${typeof height}!`);
    if (isNaN(y)) throw new Error(`Expected width to be a number, received ${typeof width}!`);
    if (isNaN(height)) throw new Error(`Expected height to be a number, received ${typeof height}!`);
    if (isNaN(width)) throw new Error(`Expected width to be a number, received ${typeof width}!`);
    if (!color) color = "#000000";
    stroke = !!stroke;

    ctx.beginPath();
    if (stroke) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.rect(x, y, width, height);
        ctx.stroke();
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
    ctx.closePath();
    return ctx;
};