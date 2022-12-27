const Canvas = require("@napi-rs/canvas");
const Util = require("./Util");
const assets = require("./Assets");

/**
 * Spotify presence card builder
 */
class Spotify {

    /**
     * Creates spotify presence card
     * @example
     * const card = new canvacord.Spotify()
        .setAuthor("Indila")
        .setAlbum("Mini World")
        .setStartTimestamp(Date.now() - 10000)
        .setEndTimestamp(Date.now() + 50000)
        .setImage("https://is5-ssl.mzstatic.com/image/thumb/Features111/v4/a4/89/a1/a489a1cb-4543-6861-a276-4470d41d6a90/mzl.zcdmhnlk.jpg/800x800bb.jpeg")
        .setTitle("S.O.S");

    card.build()
        .then(data => {
            canvacord.write(data, "./images/spotify.png");
        });
     */
    constructor() {

        /**
         * Song title
         * @type {string}
         */
        this.title = null;

        /**
         * Thumbnail
         * @type {string|Buffer|Canvas.Image}
         */
        this.image = null;

        /**
         * Song artist
         * @type {string}
         */
        this.artist = null;

        /**
         * Spotify album name
         * @type {string}
         */
        this.album = null;

        /**
         * Discord presence started timestamp
         * @type {number}
         */
        this.start = null;

        /**
         * Discord presence ending timestamp
         * @type {number}
         */
        this.end = null;

        /**
         * @typedef {object} SpotifyDataBG
         * @property {number} type Background type
         * @property {string|Buffer} data Background data
         */

        /**
         * Background
         * @type {SpotifyDataBG}
         */
        this.background = {
            type: 0,
            data: "#2F3136"
        };

        /**
         * @typedef {object} SpotifyProgressBarData
         * @property {string} bgColor Progressbar bg color
         * @property {string} color Progressbar bg color
         */

        /**
         * Progressbar details
         * @type {SpotifyProgressBarData}
         */
        this.progressBar = {
            bgColor: "#E8E8E8",
            color: "#1DB954"
        };
    }

    /**
     * Set progressbar details
     * @param {"TRACK"|"BAR"} type Progressbar type
     * @param {string} color Color to set
     * @returns {Spotify}
     */
    setProgressBar(type, color) {
        switch (type) {

            case "BAR":
                this.progressBar.color = color && typeof color === "string" ? color : "#1DB954";
                break;
            case "TRACK":
                this.progressBar.bgColor = color && typeof color === "string" ? color : "#E8E8E8";
                break;
            default:
                throw new Error(`Invalid progressbar type "${type}"!`);
        }

        return this;
    }

    /**
     * Set title
     * @param {string} title Title to set
     * @returns {Spotify}
     */
    setTitle(title) {
        if (!title || typeof title !== "string") throw new Error(`Expected title, received ${typeof title}!`);
        this.title = title;
        return this;
    }

    /**
     * Set image
     * @param {string|Buffer|Canvas.Image} source Image source
     * @returns {Spotify}
     */
    setImage(source) {
        if (!source) throw new Error(`Expected image source, received ${typeof title}!`);
        this.image = source;
        return this;
    }

    /**
     * Set artist name
     * @param {string} name Artist name
     * @returns {Spotify}
     */
    setAuthor(name) {
        if (!name || typeof name !== "string") throw new Error(`Expected artist name, received ${typeof name}!`);
        this.artist = name;
        return this;
    }

    /**
     * Set album name
     * @param {string} name Album name
     * @returns {Spotify}
     */
    setAlbum(name) {
        if (!name || typeof name !== "string") throw new Error(`Expected album name, received ${typeof name}!`);
        this.album = name;
        return this;
    }

    /**
     * Set start timestamp
     * @param {Date|number} time Timestamp
     * @returns {Spotify}
     */
    setStartTimestamp(time) {
        if (!time) throw new Error(`Expected timestamp, received ${typeof time}!`);
        if (time instanceof Date) time = time.getTime();
        this.start = time;
        return this;
    }

    /**
     * Set end timestamp
     * @param {Date|number} time Timestamp
     * @returns {Spotify}
     */
    setEndTimestamp(time) {
        if (!time) throw new Error(`Expected timestamp, received ${typeof time}!`);
        if (time instanceof Date) time = time.getTime();
        this.end = time;
        return this;
    }

    /**
     * Set background
     * @param {"COLOR"|"IMAGE"} type Background type
     * @param {string|Buffer|Canvas.Image} data Background data
     * @returns {Spotify}
     */
    setBackground(type = "COLOR", data = "#2F3136") {
        switch (type) {
            case "COLOR":
                this.background.type = 0;
                this.background.data = data && typeof data === "string" ? data : "#2F3136";
                break;
            case "IMAGE":
                if (!data) throw new Error("Missing background data!");
                this.background.type = 1;
                this.background.data = data;
                break;
            default:
                throw new Error(`Invalid background type "${type}"!`);
        }

        return this;
    }

    /**
     * This function converts raw data into spotify presence card.
     * @returns {Promise<Buffer>}
     */
    async build() {
        if (!this.title) throw new Error('Missing "title" in options.');
        if (!this.artist) throw new Error('Missing "artist" in options.');
        if (!this.start) throw new Error('Missing "start" in options.');
        if (!this.end) throw new Error('Missing "end" in options.');

        const total = this.end - this.start;
        const progress = Date.now() - this.start;
        const progressF = Util.formatTime(progress > total ? total : progress);
        const ending = Util.formatTime(total);

        const canvas = Canvas.createCanvas(600, 150);
        const ctx = canvas.getContext("2d");

        // background
        ctx.beginPath();
        if (this.background.type === 0) {
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = this.background.data || "#2F3136";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            let img = await Canvas.loadImage(this.background.data);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        // draw image
        const img = await Canvas.loadImage(this.image);
        ctx.drawImage(img, 30, 15, 120, 120);

        // draw songname
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 20px MANROPE_BOLD,NOTO_COLOR_EMOJI";
        await Util.renderEmoji(ctx, Util.shorten(this.title, 30), 170, 40);

        // draw artist name
        ctx.fillStyle = "#F1F1F1";
        ctx.font = "14px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        await Util.renderEmoji(ctx, `by ${Util.shorten(this.artist, 40)}`, 170, 70);

        // add album
        if (this.album && typeof this.album === "string") {
            ctx.fillStyle = "#F1F1F1";
            ctx.font = "14px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
            await Util.renderEmoji(ctx, `on ${Util.shorten(this.album, 40)}`, 170, 90);
        }

        // ending point
        ctx.fillStyle = "#B3B3B3";
        ctx.font = "14px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        await Util.renderEmoji(ctx, ending, 430, 130);

        // progress
        ctx.fillStyle = "#B3B3B3";
        ctx.font = "14px MANROPE_REGULAR,NOTO_COLOR_EMOJI";
        await Util.renderEmoji(ctx, progressF, 170, 130);

        // progressbar track
        ctx.rect(170, 170, 300, 4);
        ctx.fillStyle = this.progressBar.bgColor || "#E8E8E8";
        ctx.fillRect(170, 110, 300, 4);

        // progressbar
        ctx.fillStyle = this.progressBar.color || "#1DB954";
        ctx.fillRect(170, 110, this.__calculateProgress(progress, total), 4);

        // return
        return canvas.encode("png");
    }

    /**
     * Returns progress
     * @type {number}
     * @private
     * @ignore
     */
    __calculateProgress(progress, total) {
        let prg = (progress / total) * 300;
        if (isNaN(prg) || prg < 0) return 0;
        if (prg > 300) return 300;
        return prg;
    }

}

module.exports = Spotify;
