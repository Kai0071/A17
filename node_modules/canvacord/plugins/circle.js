module.exports = (ctx, w, h) => {
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, h / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    return ctx;
};