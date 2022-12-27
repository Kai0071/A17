export = Canvacord;
/**
 * Canvacord Memes Generator
 * @example const Canvacord = require("canvacord");
 *
 * Canvacord.Canvas.trigger("./image.png")
 *  .then(triggered => {
 *      Canvacord.write(triggered, "triggered.gif");
 *  })
 */
declare class Canvacord {
    /**
     * This method can be used to apply Triggered effect on image.
     * @param {string|Buffer} image Image to trigger
     * @returns {Promise<Buffer>}
     */
    static trigger(image: string | Buffer): Promise<Buffer>;
    /**
     * Inverts color of the image
     * @param {string|Buffer} image Img to invert
     * @returns {Promise<Buffer>}
     */
    static invert(image: string | Buffer): Promise<Buffer>;
    /**
     * Apply sepia wash on img
     * @param {string|Buffer} image Img
     * @returns {Promise<Buffer>}
     */
    static sepia(image: string | Buffer): Promise<Buffer>;
    /**
     * Greyscale effect over image
     * @param {string|Buffer} image Img
     * @returns {Promise<Buffer>}
     */
    static greyscale(image: string | Buffer): Promise<Buffer>;
    /**
     * Edit image brightness
     * @param {string|Buffer} image Img
     * @param {number} amount Brightness amount
     * @returns {Promise<Buffer>}
     */
    static brightness(image: string | Buffer, amount: number): Promise<Buffer>;
    /**
     * Edit image darkness
     * @param {string|Buffer} image Img
     * @param {number} amount Darkness amount
     * @returns {Promise<Buffer>}
     */
    static darkness(image: string | Buffer, amount: number): Promise<Buffer>;
    /**
     * Image threshold
     * @param {string|Buffer} img Image
     * @param {number} amount Threshold amount
     * @returns {Promise<Buffer>}
     */
    static threshold(img: string | Buffer, amount: number): Promise<Buffer>;
    /**
     * Image Convolution
     * @param {string|Buffer} img Image
     * @param {number[]} matrix Convolution matrix
     * @param {boolean} opaque If convolution should be opaque
     * @returns {Promise<Buffer>}
     */
    static convolute(img: string | Buffer, matrix: number[], opaque: boolean): Promise<Buffer>;
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
    static createProgressBar(track?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        color?: string;
        stroke?: boolean;
        lineWidth?: number;
    }, bar?: {
        width?: number;
        color?: string;
    }): Buffer;
    /**
     * Blur an image
     * @param {string|Buffer} image Image to blur
     * @returns {Promise<Buffer>}
     */
    static blur(image: string | Buffer): Promise<Buffer>;
    /**
     * Pixelate
     * @param {string|Buffer} image Image to pixelate
     * @param {number} pixels Pixels
     * @returns {Promise<Buffer>}
     */
    static pixelate(image: string | Buffer, pixels?: number): Promise<Buffer>;
    /**
     * Sharpen an image
     * @param {string|Buffer} image Image to sharpen
     * @param {number} lvl sharpness intensity
     * @returns {Promise<Buffer>}
     */
    static sharpen(image: string | Buffer, lvl?: number): Promise<Buffer>;
    /**
     * Applies burn effect on an image
     * @param {string|Buffer} image Image source
     * @param {number} lvl intensity
     * @returns {Promise<Buffer>}
     */
    static burn(image: string | Buffer, lvl?: number): Promise<Buffer>;
    /**
     * HTML5 color to image
     * @param {string} color HTML5 color
     * @param {boolean} displayHex If it should display hex
     * @param {number} height Image height
     * @param {number} width Image width
     * @returns {Buffer}
     */
    static color(color?: string, displayHex?: boolean, height?: number, width?: number): Buffer;
    /**
     * Creates circular image
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static circle(image: string | Buffer): Promise<Buffer>;
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
    static rectangle(x: number, y: number, width: number, height: number, color: string, stroke: boolean, lineWidth: number): Buffer;
    /**
     * Fuse two images
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static fuse(image1: string | Buffer, image2: string | Buffer): Promise<Buffer>;
    /**
     * Resize an image
     * @param {string|Buffer} image Image source
     * @param {number} width width
     * @param {number} height height
     * @returns {Promise<Buffer>}
     */
    static resize(image: string | Buffer, width: number, height: number): Promise<Buffer>;
    /**
     * Kiss each other ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static kiss(image1: string | Buffer, image2: string | Buffer): Promise<Buffer>;
    /**
     * Spank someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static spank(image1: string | Buffer, image2: string | Buffer): Promise<Buffer>;
    /**
     * Loads font
     * @param {any[]} fontArray Font array
     * @returns {Promise<void>}
     */
    static registerFonts(fontArray?: any[]): Promise<void>;
    /**
     * Slap someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static slap(image1: string | Buffer, image2: string | Buffer): Promise<Buffer>;
    /**
     * Oh this? This is beautiful!
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static beautiful(image: string | Buffer): Promise<Buffer>;
    /**
     * facepalm
     * @param {string|Buffer} image image
     * @returns {Promise<Buffer>}
     */
    static facepalm(image: string | Buffer): Promise<Buffer>;
    /**
     * Rainbow ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static rainbow(image: string | Buffer): Promise<Buffer>;
    /**
     * "F" in the chat
     * @param {string|Buffer} image image source
     * @returns {Promise<Buffer>}
     */
    static rip(image: string | Buffer): Promise<Buffer>;
    /**
     * Trash?
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static trash(image: string | Buffer): Promise<Buffer>;
    /**
     * Worse than hitler
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static hitler(image: string | Buffer): Promise<Buffer>;
    /**
     * Updates image color
     * @param {string|Buffer} image Image source
     * @param {string} color HTML5 color
     * @returns {Promise<Buffer>}
     */
    static colorfy(image: string | Buffer, color: string): Promise<Buffer>;
    /**
     * whoosh
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static jokeOverHead(image: string | Buffer): Promise<Buffer>;
    /**
     * Distracted boyfriend
     * @param {string|Buffer} image1 Face for the girl in red color
     * @param {string|Buffer} image2 Face for the boy
     * @param {string|Buffer} image3 Face for the other girl [optional]
     * @returns {Promise<Buffer>}
     */
    static distracted(image1: string | Buffer, image2: string | Buffer, image3?: string | Buffer): Promise<Buffer>;
    /**
     * No, it doesn't affect my baby.
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static affect(image: string | Buffer): Promise<Buffer>;
    /**
     * Jail
     * @param {string|Buffer} image Source image
     * @param {boolean} greyscale If it should greyscale image
     * @returns {Promise<Buffer>}
     */
    static jail(image: string | Buffer, greyscale?: boolean): Promise<Buffer>;
    /**
     * bed
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
     */
    static bed(image1: string | Buffer, image2: string | Buffer): Promise<Buffer>;
    /**
     * Delete
     * @param {string|Buffer} image Source image
     * @param {boolean} dark If image should be in dark mode
     * @returns {Promise<Buffer>}
     */
    static delete(image: string | Buffer, dark?: boolean): Promise<Buffer>;
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
    static tictactoe(fill?: {
        a1?: "X" | "O";
        b1?: "X" | "O";
        c1?: "X" | "O";
        a2?: "X" | "O";
        b2?: "X" | "O";
        c2?: "X" | "O";
        a3?: "X" | "O";
        b3?: "X" | "O";
        c3?: "X" | "O";
    }, color?: {
        bg?: string;
        bar?: string;
        x?: string;
        o?: string;
    }): Buffer;
    /**
     * Opinion
     * @param {string|Buffer} avatar Image
     * @param {string} msg Message
     * @returns {Promise<Buffer>}
     */
    static opinion(avatar: string | Buffer, msg: string): Promise<Buffer>;
    /**
     * Creates Gradient
     * @param {string} colorFrom Starting color
     * @param {string} colorTo Ending color
     * @param {number} width Image width
     * @param {number} height Image height
     * @returns {Buffer}
     */
    static gradient(colorFrom: string, colorTo: string, width: number, height: number): Buffer;
    /**
     * Oh no! It's Stupid.
     * @param {string} message Message
     * @returns {Promise<Buffer>}
     */
    static ohno(message: string): Promise<Buffer>;
    /**
     * Change my mind (taken from jgoralcz/image-microservice)
     * @param {String} text Text
     * @see https://github.com/jgoralcz/image-microservice/blob/master/src/workers/canvas/ChangeMyMind.js
     * @returns {Promise<Buffer>}
     */
    static changemymind(text: string): Promise<Buffer>;
    /**
     * Clyde
     * @param {string} message Message
     * @returns {Promise<Buffer>}
     */
    static clyde(message: string): Promise<Buffer>;
    /**
     * Fake Quote
     * @param {object} options Options
     * @param {Buffer|string} [options.image] Image
     * @param {string} [options.message] Message
     * @param {string} [options.username] Username
     * @param {string} [options.color] Color
     * @returns {Promise<Buffer>}
     */
    static quote(options?: {
        image?: Buffer | string;
        message?: string;
        username?: string;
        color?: string;
    }): Promise<Buffer>;
    /**
     * PornHub Comment
     * @param {Object} options Options
     * @param {String} [options.username] Username
     * @param {String} [options.message] Comment
     * @param {String|Buffer} [options.image] Image
     * @returns {Promise<Buffer>}
     */
    static phub(options?: {
        username?: string;
        message?: string;
        image?: string | Buffer;
    }): Promise<Buffer>;
    /**
     * Wanted
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static wanted(image: string | Buffer): Promise<Buffer>;
    /**
     * Wasted
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static wasted(image: string | Buffer): Promise<Buffer>;
    /**
     * YouTube comment
     * @param {object} ops YouTube comment options
     * @param {string} [ops.username] Comment author username
     * @param {string} [ops.content] The comment
     * @param {string|Buffer} [ops.avatar] Avatar source
     * @param {boolean} [ops.dark=false] Dark mode?
     * @returns {Promise<Buffer>}
     */
    static youtube(ops?: {
        username?: string;
        content?: string;
        avatar?: string | Buffer;
        dark?: boolean;
    }): Promise<Buffer>;
    /**
     * Oh Shit!
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
     */
    static shit(image: string | Buffer): Promise<Buffer>;
    /**
     * Writes the data as file
     * @param {Buffer} data data to write
     * @param {string} name file name
     * @returns {void}
     */
    static write(data: Buffer, name: string): void;
    /**
     * Returns default icon of a discord server
     * @param {string} name Guild name
     * @param {number} size Icon size. Valid: `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048` & `4096`
     * @returns {Promise<Buffer>}
     */
    static guildIcon(name: string, size?: number): Promise<Buffer>;
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
    static reply(options?: {
        avatar1?: string | Buffer;
        avatar2?: string | Buffer;
        user1?: string;
        user2?: string;
        hex1?: string;
        hex2?: string;
        mainText?: string;
        replyText?: string;
    }): Promise<Buffer>;
    /**
     * Canvacord assets
     * @type {CanvacordAssets}
     * @private
     */
    private static get assets();
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
    static get CONVOLUTION_MATRIX(): {
        /**
         * Edges Matrix
         */
        EDGES: number[];
        /**
         * Blur Matrix
         */
        BLUR: number[];
        /**
         * Sharpen Matrix
         */
        SHARPEN: number[];
        /**
         * Burn Matrix
         */
        BURN: number[];
    };
    /**
     * Canvacord utils
     * @type {Util}
     */
    static get Util(): Util;
}
import Util = require("./Util");
//# sourceMappingURL=Canvacord.d.ts.map