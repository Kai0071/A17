const Trigger = require("../libs/Trigger");
const Greyscale = require("../libs/Greyscale");
const Invert = require("../libs/Invert");
const Sepia = require("../libs/Sepia");
const assets = require("./Assets");
const fs = require("fs");
const Brightness = require("../libs/Brightness");
const Threshold = require("../libs/Threshold");
const Convolute = require("../libs/Convolute");
const rect = require("../plugins/rect");
const Canvas = require("@napi-rs/canvas");
const Darkness = require("../libs/Darkness");
const circle = require("../plugins/circle");
const round = require("../plugins/round");
const Util = require("./Util");


/**
 * Canvacord Memes Generator
 * @example const Canvacord = require("canvacord");
 * 
 * Canvacord.Canvas.trigger("./image.png")
 *  .then(triggered => {
 *      Canvacord.write(triggered, "triggered.gif");
 *  })
 */
class Canvacord {

    /**
     * **⚠ You may not instantiate Canvacord class! ⚠**
     * @hideconstructor
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * This method can be used to apply Triggered effect on image.
     * @param {string|Buffer} image Image to trigger
     * @returns {Promise<Buffer>}
     */
    static async trigger(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Trigger(image, Canvacord.assets.image.get("TRIGGERED"));
    }

    /**
     * Inverts color of the image
     * @param {string|Buffer} image Img to invert
     * @returns {Promise<Buffer>}
     */
    static async invert(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Invert(image);
    }

    /**
     * Apply sepia wash on img
     * @param {string|Buffer} image Img
     * @returns {Promise<Buffer>}
     */
    static async sepia(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Sepia(image);
    }

    /**
     * Greyscale effect over image
     * @param {string|Buffer} image Img
     * @returns {Promise<Buffer>}
     */
    static async greyscale(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Greyscale(image);
    }

    /**
     * Edit image brightness
     * @param {string|Buffer} image Img
     * @param {number} amount Brightness amount
     * @returns {Promise<Buffer>}
     */
    static async brightness(image, amount) {
        if (!image) throw new Error("Expected image, received nothing!");
        if (isNaN(amount)) throw new Error("Amount must be a number!");
        return await Brightness(image, amount);
    }

    /**
     * Edit image darkness
     * @param {string|Buffer} image Img
     * @param {number} amount Darkness amount
     * @returns {Promise<Buffer>}
     */
    static async darkness(image, amount) {
        if (!image) throw new Error("Expected image, received nothing!");
        if (isNaN(amount)) throw new Error("Amount must be a number!");
        return await Darkness(image, amount);
    }

    /**
     * Image threshold
     * @param {string|Buffer} img Image
     * @param {number} amount Threshold amount
     * @returns {Promise<Buffer>}
     */
    static async threshold(img, amount) {
        if (!img) throw new Error("Expected image, received nothing!");
        if (isNaN(amount)) throw new Error("Amount must be a number!");
        return await Threshold(img, amount);
    }

    /**
     * Image Convolution
     * @param {string|Buffer} img Image
     * @param {number[]} matrix Convolution matrix
     * @param {boolean} opaque If convolution should be opaque
     * @returns {Promise<Buffer>}
     */
    static async convolute(img, matrix, opaque) {
        if (!img) throw new Error("Expected image, received nothing!");
        if (!Array.isArray(matrix)) throw new Error("Convolution matrix must be Array.");
        return await Convolute(img, matrix, opaque);
    }

    /**
     * Creates Progress bar
     * @param {object} track Progressbar track options
     * @param {number} [track.x] The x-axis
     * @param {number} [track.y] The y-axis
     * @param {number} [track.width] Progressbar track width
     * @param {number} [track.height] Progressbar track height
     * @param {string} [track.color] Progressbar track color
     * @param {boolean} [track.stroke] Use stroke for track
     * @param {number} [track.lineWidth] This param will be used if `track.stroke` is set to `true`
     * @param {object} bar Progressbar options
     * @param {number} [bar.width] Progressbar width
     * @param {string} [bar.color] Progressbar color
     * @returns {Buffer}
     */
    static createProgressBar(
        track = { x: false, y: false, width: false, height: false, color: false, stroke: false, lineWidth: false },
        bar = { width: false, color: false }
    ) {
        if (!track) throw new Error("Invalid track args!");
        if (!bar) throw new Error("Invalid progressbar args!");

        const canvas = Canvas.createCanvas(track.width, track.height);
        const ctx = canvas.getContext("2d");

        if (bar.width > track.width) bar.width = track.width;
        if (bar.width < 0) bar.width = 0;

        if (track.stroke) {
            rect(ctx, track.x, track.y, track.height, bar.width, bar.color, false);
            rect(ctx, track.x, track.y, track.height, track.width, track.color, track.stroke, track.lineWidth);
        } else {
            rect(ctx, track.x, track.y, track.height, track.width, track.color, track.stroke, track.lineWidth);
            rect(ctx, track.x, track.y, track.height, bar.width, bar.color, false);
        }

        return canvas.toBuffer();
    }

    /**
     * Blur an image
     * @param {string|Buffer} image Image to blur 
     * @returns {Promise<Buffer>}
     */
    static async blur(image) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width / 4, canvas.height / 4);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(canvas, 0, 0, canvas.width / 4, canvas.height / 4, 0, 0, canvas.width + 5, canvas.height + 5);

        return canvas.encode("png");
    }

    /**
     * Pixelate
     * @param {string|Buffer} image Image to pixelate 
     * @param {number} pixels Pixels
     * @returns {Promise<Buffer>}
     */
    static async pixelate(image, pixels = 5) {
        if (!image) throw new Error("Image was not provided!");
        if (!pixels || typeof pixels !== "number") pixels = 100;
        if (pixels < 1) pixels = 100;
        if (pixels > 100) pixels = 100;

        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        const pixel = pixels / 100;

        ctx.drawImage(img, 0, 0, canvas.width * pixel, canvas.height * pixel);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, canvas.width * pixel, canvas.height * pixel, 0, 0, canvas.width + 5, canvas.height + 5);

        return canvas.encode("png");
    }

    /**
     * Sharpen an image
     * @param {string|Buffer} image Image to sharpen 
     * @param {number} lvl sharpness intensity
     * @returns {Promise<Buffer>}
     */
    static async sharpen(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.SHARPEN, true, lvl);
    }

    /**
     * Applies burn effect on an image
     * @param {string|Buffer} image Image source 
     * @param {number} lvl intensity
     * @returns {Promise<Buffer>}
     */
    static async burn(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.BURN, true, lvl);
    }

    /**
     * HTML5 color to image
     * @param {string} color HTML5 color
     * @param {boolean} displayHex If it should display hex
     * @param {number} height Image height
     * @param {number} width Image width
     * @returns {Buffer}
     */
    static color(color = "#FFFFFF", displayHex = false, height = 1024, width = 1024) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        rect(ctx, 0, 0, height, width, color);

        if (!!displayHex) {
            const ic = Util.invertColor(color);
            ctx.font = "bold 72px MANROPE_BOLD,NOTO_COLOR_EMOJI";
            ctx.fillStyle = ic;
            ctx.fillText(color.toUpperCase(), canvas.width / 3, canvas.height / 2);
        }

        return canvas.toBuffer();
    }

    /**
     * Creates circular image
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static async circle(image) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        circle(ctx, canvas.width, canvas.height);
        return canvas.encode("png");
    }

    /**
     * Creates a rectangle
     * @param {number} x x-axis
     * @param {number} y y-axis
     * @param {number} width width
     * @param {number} height height
     * @param {string} color color
     * @param {boolean} stroke If it should stroke
     * @param {number} lineWidth line width
     * @returns {Buffer}
     */
    static rectangle(x, y, width, height, color, stroke, lineWidth) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        rect(ctx, x, y, canvas.height, canvas.width, color, !!stroke, lineWidth);
        round(ctx, x, y, canvas.width, canvas.height);
        return canvas.toBuffer();
    }

    /**
     * Fuse two images
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static async fuse(image1, image2) {
        if (!image1) throw new Error("Missing parameter 'image1'!");
        if (!image2) throw new Error("Missing parameter 'image2'!");

        const img1 = await Canvas.loadImage(image1);
        const img2 = await Canvas.loadImage(image2);

        const canvas = Canvas.createCanvas(img1.width, img1.height);
        const ctx = canvas.getContext("2d");
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        return canvas.encode("png");
    }

    /**
     * Resize an image
     * @param {string|Buffer} image Image source
     * @param {number} width width
     * @param {number} height height
     * @returns {Promise<Buffer>}
     */
    static async resize(image, width, height) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const w = width && !isNaN(width) ? width : img.width;
        const h = height && !isNaN(height) ? width : img.height;
        const canvas = await Canvas.createCanvas(w, h);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.encode("png");
    }

    /**
     * Kiss each other ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static async kiss(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const canvas = Canvas.createCanvas(768, 574);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(Canvacord.assets.image.get("KISS"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 370, 25, 200, 200);
        ctx.drawImage(avatar, 150, 25, 200, 200);
        return canvas.encode("png");
    }

    /**
     * Spank someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static async spank(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");

        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(Canvacord.assets.image.get("SPANK"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 350, 220, 120, 120);
        ctx.drawImage(avatar, 225, 5, 140, 140);
        return canvas.encode("png");
    }

    /**
     * Loads font
     * @param {any[]} fontArray Font array
     * @returns {Promise<void>}
     */
    static async registerFonts(fontArray = []) {
        if (!fontArray.length) {
            // Canvas.GlobalFonts.loadFontsFromDir(`${Canvacord.assets.ASSETS_DIR}/fonts`)
            const fonts = Canvacord.assets.font.all();

            for (const font in fonts) {
                Canvas.GlobalFonts.registerFromPath(fonts[font].path, fonts[font].name);
            }
        } else {
            fontArray.forEach(font => {
                Canvas.GlobalFonts.registerFromPath(font.path, font.name || font.face?.family);
            });
        }
    }

    /**
     * Slap someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static async slap(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");

        const canvas = Canvas.createCanvas(1000, 500);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(Canvacord.assets.image.get("BATSLAP"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 580, 260, 200, 200);
        ctx.drawImage(avatar, 350, 70, 220, 220);
        return canvas.encode("png");
    }

    /**
     * Oh this? This is beautiful!
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static async beautiful(image) {
        if (!image) throw new Error("Image was not provided!");

        const img = await Canvas.loadImage(image);
        const base = await Canvas.loadImage(Canvacord.assets.image.get("BEAUTIFUL"));
        const canvas = Canvas.createCanvas(376, 400);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 258, 28, 84, 95);
        ctx.drawImage(img, 258, 229, 84, 95);

        return canvas.encode("png");
    }

    /**
     * facepalm
     * @param {string|Buffer} image image
     * @returns {Promise<Buffer>}
     */
    static async facepalm(image) {
        if (!image) throw new Error("image was not provided!");

        let layer = await Canvas.loadImage(Canvacord.assets.image.get("FACEPALM"));
        let canvas = Canvas.createCanvas(632, 357);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
        let avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        ctx.drawImage(layer, 0, 0, 632, 357);
        return canvas.encode("png");
    }

    /**
     * Rainbow ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static async rainbow(image) {
        if (!image) throw new Error("image was not provided!");

        let bg = await Canvas.loadImage(Canvacord.assets.image.get("GAY"));
        let img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        return canvas.encode("png");
    }

    /**
     * "F" in the chat
     * @param {string|Buffer} image image source
     * @returns {Promise<Buffer>}
     */
    static async rip(image) {
        if (!image) throw new Error("Image was not provided!");

        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("RIP"));
        const canvas = Canvas.createCanvas(244, 253);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 63, 110, 90, 90);
        return canvas.encode("png");
    }

    /**
     * Trash?
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static async trash(image) {
        if (!image) throw new Error("Image was not provided!");

        const blur = await Canvacord.blur(image);
        const img = await Canvas.loadImage(blur);
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("TRASH"));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 309, 0, 309, 309);
        return canvas.encode("png");
    }

    /**
     * Worse than hitler
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static async hitler(image) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("HITLER"));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 46, 43, 140, 140);

        return canvas.encode("png");
    }

    /**
     * Updates image color
     * @param {string|Buffer} image Image source
     * @param {string} color HTML5 color
     * @returns {Promise<Buffer>}
     */
    static async colorfy(image, color) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (color) {
            ctx.globalCompositeOperation = "color";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        return canvas.encode("png");
    }

    /**
     * whoosh
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static async jokeOverHead(image) {
        if (!image) throw new Error("Image wasn ot provided!");

        const layer = await Canvas.loadImage(Canvacord.assets.image.get("JOKEOVERHEAD"));
        const img = await Canvas.loadImage(image)
        const canvas = Canvas.createCanvas(425, 404);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 425, 404);
        ctx.drawImage(img, 125, 130, 140, 135);
        ctx.drawImage(layer, 0, 0, 425, 404);
        return canvas.encode("png");
    }

    /**
     * Distracted boyfriend
     * @param {string|Buffer} image1 Face for the girl in red color
     * @param {string|Buffer} image2 Face for the boy
     * @param {string|Buffer} image3 Face for the other girl [optional]
     * @returns {Promise<Buffer>}
     */
    static async distracted(image1, image2, image3 = null) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");

        const background = await Canvas.loadImage(Canvacord.assets.image.get("DISTRACTED"));
        const avatar1 = await Canvas.loadImage(await Canvacord.circle(image1));
        const avatar2 = await Canvas.loadImage(await Canvacord.circle(image2));
        const avatar3 = image3 ? await Canvas.loadImage(await Canvacord.circle(image3)) : null;

        const canvas = Canvas.createCanvas(background.width, background.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar1, 180, 90, 150, 150);
        ctx.drawImage(avatar2, 480, 35, 130, 130);
        if (avatar3) ctx.drawImage(avatar3, 730, 110, 130, 130);

        return canvas.encode("png");
    }

    /**
     * No, it doesn't affect my baby.
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static async affect(image) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("AFFECT"));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 180, 383, 200, 157);

        return canvas.encode("png");
    }

    /**
     * Jail
     * @param {string|Buffer} image Source image
     * @param {boolean} greyscale If it should greyscale image
     * @returns {Promise<Buffer>}
     */
    static async jail(image, greyscale = false) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(greyscale ? await Canvacord.greyscale(image) : image);
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("JAIL"));

        const canvas = Canvas.createCanvas(350, 350);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.encode("png");
    }

    /**
     * bed
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static async bed(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");

        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        const background = await Canvas.loadImage(Canvacord.assets.image.get("BED"));

        const canvas = Canvas.createCanvas(background.width, background.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(avatar, 25, 100, 100, 100);
        ctx.drawImage(avatar, 25, 300, 100, 100);
        ctx.drawImage(avatar, 53, 450, 70, 70);
        ctx.drawImage(avatar1, 53, 575, 100, 100);

        return canvas.encode("png");
    }

    /**
     * Delete
     * @param {string|Buffer} image Source image
     * @param {boolean} dark If image should be in dark mode
     * @returns {Promise<Buffer>}
     */
    static async delete(image, dark = false) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(dark ? await Canvacord.invert(Canvacord.assets.image.get("DELETE")) : Canvacord.assets.image.get("DELETE"));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 120, 135, 195, 195);

        return canvas.encode("png");
    }

    /**
     * TicTacToe
     * @param {object} fill TicTacToe params
     * @param {"X"|"O"} [fill.a1] a1 value
     * @param {"X"|"O"} [fill.b1] b1 value
     * @param {"X"|"O"} [fill.c1] c1 value
     * @param {"X"|"O"} [fill.a2] a2 value
     * @param {"X"|"O"} [fill.b2] b2 value
     * @param {"X"|"O"} [fill.c2] c2 value
     * @param {"X"|"O"} [fill.a3] a3 value
     * @param {"X"|"O"} [fill.b3] b3 value
     * @param {"X"|"O"} [fill.c3] c3 value
     * @param {object} color Color params
     * @param {string} [color.bg] Background clolor
     * @param {string} [color.bar] TicTacToe bar color
     * @param {string} [color.x] Color of **X**
     * @param {string} [color.o] Color of **O**
     * @returns {Buffer}
     */
    static tictactoe(fill = { a1: 0, b1: 0, c1: 0, a2: 0, b2: 0, c2: 0, a3: 0, b3: 0, c3: 0 }, color = { bg: 0, bar: 0, x: 0, o: 0 }) {
        color = {
            bg: color.bg || "white",
            bar: color.bar || "black",
            x: color.x || "red",
            o: color.o || "blue"
        };

        const canvas = Canvas.createCanvas(2048, 2048);
        const ctx = canvas.getContext("2d");

        const drawO = (x, y) => {
            let halfSectionSize = (0.5 * 682);
            let centerX = x + halfSectionSize;
            let centerY = y + halfSectionSize;
            let radius = (682 - 100) / 2;
            let startAngle = 0 * Math.PI;
            let endAngle = 2 * Math.PI;

            ctx.lineWidth = 40;
            ctx.strokeStyle = color.o;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.stroke();
        };

        const drawX = (x, y) => {
            ctx.strokeStyle = color.x;
            ctx.lineWidth = 40;
            ctx.beginPath();
            let offset = 50;
            ctx.moveTo(x + offset, y + offset);
            ctx.lineTo(x + 682 - offset, y + 682 - offset);
            ctx.moveTo(x + offset, y + 682 - offset);
            ctx.lineTo(x + 682 - offset, y + offset);
            ctx.stroke();
        };

        const params = {
            a1: {
                x: 5,
                y: 5
            },
            b1: {
                x: 682,
                y: 5
            },
            c1: {
                x: 1364,
                y: 5
            },
            a2: {
                x: 5,
                y: 682
            },
            b2: {
                x: 682,
                y: 682
            },
            c2: {
                x: 1364,
                y: 682
            },
            a3: {
                x: 5,
                y: 1364
            },
            b3: {
                x: 682,
                y: 1364
            },
            c3: {
                x: 1364,
                y: 1364
            }
        };

        // background
        ctx.fillStyle = color.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Lines
        ctx.lineWidth = 30;
        ctx.lineCap = "round";
        ctx.strokeStyle = color.bar;
        ctx.beginPath();

        //Horizontal lines 
        for (var y = 1; y <= 2; y++) {
            ctx.moveTo(4, y * 682);
            ctx.lineTo(2043, y * 682);
        }
        // Vertical lines 
        for (var x = 1; x <= 2; x++) {
            ctx.moveTo(x * 682, 4);
            ctx.lineTo(x * 682, 2043);
        }

        ctx.stroke();

        // apply
        Object.keys(fill).forEach(x => {
            if (!fill[x] || !["X", "O"].includes(fill[x])) return;
            const data = params[x];
            fill[x] === "X" ? drawX(data.x, data.y) : drawO(data.x, data.y);
        });

        return canvas.toBuffer();
    }

    /**
     * Opinion
     * @param {string|Buffer} avatar Image
     * @param {string} msg Message
     * @returns {Promise<Buffer>}
     */
    static async opinion(avatar, msg) {
        if (!avatar) throw new Error("Avatar was not provided!");
        if (!msg) throw new Error("Message was not provided!");

        const bg = await Canvas.loadImage(Canvacord.assets.image.get("OPINION"));
        const ava = await Canvas.loadImage(avatar);

        const canvas = Canvas.createCanvas(482, 481);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(ava, 62, 340, 85, 85);
        ctx.drawImage(ava, 260, 180, 70, 70);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        ctx.font = "bold 15px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#000000";
        await Util.renderEmoji(ctx, Util.shorten(msg, 24), canvas.width / 10, canvas.height / 1.51);

        return canvas.encode("png");
    }

    /**
     * Creates Gradient
     * @param {string} colorFrom Starting color
     * @param {string} colorTo Ending color
     * @param {number} width Image width
     * @param {number} height Image height
     * @returns {Buffer}
     */
    static gradient(colorFrom, colorTo, width, height) {
        if (!colorFrom) throw new Error("ColorFrom was not provided!");
        if (!colorTo) throw new Error("ColorTo was not provided!");

        const canvas = Canvas.createCanvas(width || 400, height || 200);
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

        gradient.addColorStop(0, colorFrom);
        gradient.addColorStop(1, colorTo);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    /**
     * Oh no! It's Stupid.
     * @param {string} message Message
     * @returns {Promise<Buffer>}
     */
    static async ohno(message) {
        if (!message) throw new Error("Message was not provided!");
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("OHNO"));
        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        ctx.font = "bold 50px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#000000";
        await Util.renderEmoji(ctx, Util.shorten(message, 20), 540, 195);

        return canvas.encode("png");
    }

    /**
     * Change my mind (taken from jgoralcz/image-microservice)
     * @param {String} text Text
     * @see https://github.com/jgoralcz/image-microservice/blob/master/src/workers/canvas/ChangeMyMind.js
     * @returns {Promise<Buffer>}
     */
    static async changemymind(text) {
        if (!text) throw new Error("missing text!");

        const base = await Canvas.loadImage(Canvacord.assets.image.get("CHANGEMYMIND"));
        const canvas = Canvas.createCanvas(base.width, base.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        let x = text.length;
        let fontSize = 60;
        if (x <= 15) {
            ctx.translate(310, 365);
        } else if (x <= 30) {
            fontSize = 50;
            ctx.translate(315, 365);
        } else if (x <= 70) {
            fontSize = 40;
            ctx.translate(315, 365);
        } else if (x <= 85) {
            fontSize = 32;
            ctx.translate(315, 365);
        } else if (x < 100) {
            fontSize = 26;
            ctx.translate(315, 365);
        } else if (x < 120) {
            fontSize = 21;
            ctx.translate(315, 365);
        } else if (x < 180) {
            fontSize = 0.0032 * (x * x) - 0.878 * x + 80.545;
            ctx.translate(315, 365);
        } else if (x < 700) {
            fontSize = 0.0000168 * (x * x) - 0.0319 * x + 23.62;
            ctx.translate(310, 338);
        } else {
            fontSize = 7;
            ctx.translate(310, 335);
        }
        ctx.font = `${fontSize}px ROBOTO_REGULAR,NOTO_COLOR_EMOJI`;
        ctx.rotate(-0.39575);

        const lines = Util.getLines({ text, ctx, maxWidth: 345 });
        let i = 0;
        while (i < lines.length) {
            ctx.fillText(lines[i], 10, i * fontSize + 15);
            i++;
        }
        return canvas.encode("png");
    }

    /**
     * Clyde
     * @param {string} message Message
     * @returns {Promise<Buffer>}
     */
    static async clyde(message) {
        if (!message) messgae = "Please provide text!";
        let avatar = await Canvas.loadImage(await Canvacord.circle(Canvacord.assets.image.get("CLYDE")));
        let badge = await Canvas.loadImage(Canvacord.assets.image.get("BOTBADGE"));

        const canvas = Canvas.createCanvas(1500, 300);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#36393E";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(avatar, 75, 30, 130, 130);
        ctx.drawImage(badge, 360, 45, 100, 40);

        ctx.font = "40px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        await Util.renderEmoji(ctx, Util.shorten(message, 66), 230, 150);

        ctx.font = "50px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText("Clyde", 230, 80);

        ctx.font = "40px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#7D7D7D";
        ctx.textAlign = "start";
        ctx.fillText(Util.discordTime(), 470, 80);

        ctx.font = "20px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#7D7D7D";
        ctx.textAlign = "start";
        ctx.fillText("Only you can see this  —", 240, 190);

        ctx.font = "20px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#2785C7";
        ctx.textAlign = "start";
        ctx.fillText("delete this message.", 240 + ctx.measureText("Only you can see this  —").width + 10, 190);

        return canvas.encode("png");
    }

    /**
     * Fake Quote
     * @param {object} options Options
     * @param {Buffer|string} [options.image] Image
     * @param {string} [options.message] Message
     * @param {string} [options.username] Username
     * @param {string} [options.color] Color
     * @returns {Promise<Buffer>}
     */
    static async quote(options = { image, message, username, color }) {

        if (!options.image) options.image = Canvacord.assets.image.get("CLYDE");
        if (!options.message) options.message = "Please provide text!";
        if (!options.username) options.username = "Clyde";
        if (!options.color) options.color = "#FFFFFF";

        let image = await Canvas.loadImage(await Canvacord.circle(options.image));

        const canvas = Canvas.createCanvas(1500, 300);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#36393E";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(image, 75, 30, 130, 130);

        ctx.font = "40px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        await Util.renderEmoji(ctx, Util.shorten(options.message, 66), 230, 150);

        ctx.font = "50px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillStyle = typeof options.color == "string" ? options.color : "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText(typeof options.username === "string" ? Util.shorten(options.username, 17) : "Clyde", 230, 80);

        ctx.font = "40px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#7D7D7D";
        ctx.textAlign = "start";
        ctx.fillText(Util.discordTime(), 240 + ctx.measureText(Util.shorten(options.username, 17)).width + 110, 80);

        return canvas.encode("png");
    }

    /**
     * PornHub Comment
     * @param {Object} options Options
     * @param {String} [options.username] Username
     * @param {String} [options.message] Comment
     * @param {String|Buffer} [options.image] Image
     * @returns {Promise<Buffer>}
     */
    static async phub(options = { username: null, message: null, image: null }) {
        if (!options.username) throw new Error("Username may not be empty!");
        if (!options.message) throw new Error("Message may not be empty!");
        if (!options.image) throw new Error("Image may not be empty!");


        let image = await Canvas.loadImage(options.image);
        let baseImage = await Canvas.loadImage(Canvacord.assets.image.get("PHUB"));

        let canvas = Canvas.createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");

        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 30, 310, 70, 70);

        ctx.font = "32px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#F99600";
        ctx.textAlign = "start";
        ctx.fillText(Util.shorten(options.username, 20), 115, 350);

        ctx.font = "32px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#CCCCCC";
        ctx.textAlign = "start";
        await Util.renderEmoji(ctx, Util.shorten(options.message, 50), 30, 430);

        return canvas.encode("png");
    }

    /**
     * Wanted
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static async wanted(image) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("WANTED"));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 145, 282, 447, 447);

        return canvas.encode("png");
    }

    /**
     * Wasted
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static async wasted(image) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(await Canvacord.greyscale(image));
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("WASTED"));

        const canvas = Canvas.createCanvas(512, 512);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.encode("png");
    }

    /**
     * YouTube comment
     * @param {object} ops YouTube comment options
     * @param {string} [ops.username] Comment author username
     * @param {string} [ops.content] The comment
     * @param {string|Buffer} [ops.avatar] Avatar source
     * @param {boolean} [ops.dark=false] Dark mode?
     * @returns {Promise<Buffer>}
     */
    static async youtube(ops = { username: null, content: null, avatar: null, dark: false }) {
        if (!ops.username || typeof ops.username !== "string") throw new Error("Username may not be empty!");
        if (!ops.content || typeof ops.content !== "string") throw new Error("Content may not be empty!");
        if (!ops.avatar) throw new Error("Avatar source may not be empty!");
        ops.dark = !!ops.dark;


        const bg = await Canvas.loadImage(!ops.dark ? Canvacord.assets.image.get("YOUTUBE") : await Canvacord.invert(Canvacord.assets.image.get("YOUTUBE")));
        const avatar = await Canvas.loadImage(await Canvacord.circle(ops.avatar));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, -3, -3, canvas.width + 6, canvas.height + 6);
        ctx.drawImage(avatar, 17, 33, 52, 52);

        let time = Math.floor(Math.random() * (59 - 1)) + 1;
        time = `${time + (time == 1 ? " minute" : " minutes")} ago`;

        const username = Util.shorten(ops.username, 21);
        const comment = Util.shorten(ops.content, 60);

        ctx.font = "20px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = ops.dark ? "#FFFFFF" : "#000000";
        ctx.fillText(username, 92, 50);

        ctx.font = "16px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#909090";
        ctx.fillText(time, ctx.measureText(username).width + 140, 50);

        ctx.font = "18px ROBOTO_REGULAR,NOTO_COLOR_EMOJI";
        ctx.fillStyle = ops.dark ? "#FFFFFF" : "#000000";
        await Util.renderEmoji(ctx, comment, 92, 80);

        return canvas.encode("png");
    }

    /**
     * Oh Shit!
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static async shit(image) {
        if (!image) throw new Error("image was not provided!");

        const img = await Canvas.loadImage(await Canvacord.circle(image));
        const bg = await Canvas.loadImage(Canvacord.assets.image.get("SHIT"));

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 210, 700, 170, 170);

        return canvas.encode("png");
    }

    /**
     * Writes the data as file
     * @param {Buffer} data data to write
     * @param {string} name file name
     * @returns {void}
     */
    static write(data, name) {
        return fs.writeFileSync(name, data);
    }

    /**
     * Returns default icon of a discord server
     * @param {string} name Guild name
     * @param {number} size Icon size. Valid: `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048` & `4096`
     * @returns {Promise<Buffer>}
     */
    static async guildIcon(name, size = 1024) {
        const str = Util.getAcronym(name);
        if (!str) throw new Error("Couldn't parse acronym!");
        if (typeof size !== "number" || size < 0 || size > 4096 || size % 16 !== 0) throw new Error("Invalid icon size!");

        const canvas = Canvas.createCanvas(size, size);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#7289DA";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${size / 4}px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI`;
        await Util.renderEmoji(ctx, str, canvas.width / 4, canvas.height / 1.7);

        return canvas.encode("png");
    }

    /**
     * Discord Reply Clone
     * @param {object} options Options
     * @param {string|Buffer} [options.avatar1] Avatar of the person who replied
     * @param {string|Buffer} [options.avatar2] Avatar of the other person
     * @param {string} [options.user1] Username of the person who replied
     * @param {string} [options.user2] Username of the other person
     * @param {string} [options.hex1] Hex color of the person who replied
     * @param {string} [options.hex2] Hex color of the other person
     * @param {string} [options.mainText] The message
     * @param {string} [options.replyText] The reply message
     * @returns {Promise<Buffer>}
     * @example const img = "https://cdn.discordapp.com/embed/avatars/0.png";
     * const img2 = "https://cdn.discordapp.com/embed/avatars/4.png";
     * canvacord.Canvas.reply({
     *      avatar1: img,
     *      avatar2: img2,
     *      user1: "Maximus",
     *      user2: "Snowflake",
     *      hex1: "#FF3300",
     *      hex2: "#7289da",
     *      mainText: "kok",
     *      replyText: "Pog"
     * })
     * .then(img => canvacord.write(img, "reply.png"));
     */
    static async reply(options = { avatar1: null, avatar2: null, user1: null, user2: null, hex1: null, hex2: null, mainText: null, replyText: null }) {
        let { avatar1, avatar2, user1, user2, hex1, hex2, mainText, replyText } = options;

        if (!avatar1) throw new Error("First avatar was not provided!");
        if (!avatar2) throw new Error("Second avatar was not provided!");
        if (!user1) throw new Error("First username was not provided!");
        if (!user2) throw new Error("Second username was not provided!");
        if (!mainText || typeof mainText !== "string") throw new Error("Main text was not provided!");
        if (!replyText || typeof replyText !== "string") throw new Error("Reply text was not provided!");
        if (!hex1 || typeof hex1 !== "string") hex1 = "#FFFFFF";
        if (!hex2 || typeof hex2 !== "string") hex2 = "#FFFFFF";

        const img1 = await Canvas.loadImage(avatar1);
        const img2 = await Canvas.loadImage(avatar2);

        const canvas = Canvas.createCanvas(1300, 250);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#36393E";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";

        ctx.font = "38px MANROPE_REGULAR,NOTO_COLOR_EMOJI";

        await Util.renderEmoji(ctx, Util.shorten(replyText, 32), 186, 200);

        ctx.font = "38px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillStyle = Util.formatHex(hex1, "#FFFFFF");
        ctx.fillText(user1, 185, 147);

        const usernameWidth = ctx.measureText(user1).width;
        ctx.fillStyle = "#d1d1d1";
        ctx.font = "38px MANROPE_REGULAR,NOTO_COLOR_EMOJI";

        ctx.fillText(" replied to ", 165 + usernameWidth + 20, 147);

        const repliedWidth = ctx.measureText(" replied to ").width;

        ctx.fillStyle = Util.formatHex(hex2, "#FFFFFF");
        ctx.font = "38px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillText(user2, 165 + usernameWidth + repliedWidth + 20, 167 - 20);

        const secondMemberUserWidth = ctx.measureText(user2).width;

        ctx.font = "26px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.fillStyle = "#7a7c80";
        const time = Util.discordTime();

        ctx.fillText(` ${time}`, 165 + usernameWidth + repliedWidth + secondMemberUserWidth + 3 + 20, 167 - 20)

        ctx.font = "29px WHITNEY_MEDIUM,NOTO_COLOR_EMOJI";
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "#d1d1d1";
        ctx.fillText(Util.shorten(mainText, 64), 195 + 20 + 20, 100 + 5 - 20);

        ctx.strokeStyle = "#a3a2a2";
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.4;
        ctx.moveTo(34 + (105 / 2) + 70 + 20, 92 + 5 - 20);
        ctx.lineTo(34 + (105 / 2) + 20, 92 + 5 - 20);

        ctx.moveTo(34 + (105 / 2) + 20, 92 + 5 - 20);
        ctx.quadraticCurveTo(34 + (105 / 2) + 4, 92 + 5 - 20, 34 + (105 / 2), 103 + 5 - 20);

        ctx.moveTo(34 + (105 / 2), 125 - 20);
        ctx.lineTo(34 + (105 / 2), 103 + 5 - 20);
        ctx.stroke();


        ctx.globalAlpha = 1;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(90, 182 - 20, 50, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#36393E";
        ctx.stroke();
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(img1, 38, 130 - 20, 105, 105);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(165 + 20 + 20, 90 + 5 - 20, 20, 0, Math.PI * 2);
        ctx.strokeStyle = "#36393E";
        ctx.stroke();
        ctx.closePath();

        ctx.clip();

        ctx.drawImage(img2, 165 + 20, 70 + 5 - 20, 40, 40);
        ctx.restore();

        return canvas.encode("png");
    }

    /**
     * Canvacord assets
     * @type {CanvacordAssets}
     * @private
     */
    static get assets() {
        return assets;
    }

    /**
     * Canvacord convolution matrix
     * @typedef {object} ConvolutionMatrix
     * @property {number[]} EDGES Edges Matrix
     * @property {number[]} BLUR Blur Matrix
     * @property {number[]} SHARPEN Sharpen Matrix
     * @property {number[]} BURN Burn Matrix
     */

    /**
     * Matrix data for **Canvacord.convolute()**
     * @type {ConvolutionMatrix}
     */
    static get CONVOLUTION_MATRIX() {
        return {
            EDGES: [0, -1, 0, -1, 4, -1, 0, -1, 0],
            BLUR: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
            SHARPEN: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            BURN: [1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11]
        };
    }

    /**
     * Canvacord utils
     * @type {Util}
     */
    static get Util() {
        return Util;
    }

}

module.exports = Canvacord;
