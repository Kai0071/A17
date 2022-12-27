export = Spotify;
/**
 * Spotify presence card builder
 */
declare class Spotify {
    /**
     * Song title
     * @type {string}
     */
    title: string;
    /**
     * Thumbnail
     * @type {string|Buffer|Canvas.Image}
     */
    image: string | Buffer | Canvas.Image;
    /**
     * Song artist
     * @type {string}
     */
    artist: string;
    /**
     * Spotify album name
     * @type {string}
     */
    album: string;
    /**
     * Discord presence started timestamp
     * @type {number}
     */
    start: number;
    /**
     * Discord presence ending timestamp
     * @type {number}
     */
    end: number;
    /**
     * @typedef {object} SpotifyDataBG
     * @property {number} type Background type
     * @property {string|Buffer} data Background data
     */
    /**
     * Background
     * @type {SpotifyDataBG}
     */
    background: {
        /**
         * Background type
         */
        type: number;
        /**
         * Background data
         */
        data: string | Buffer;
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
    progressBar: {
        /**
         * Progressbar bg color
         */
        bgColor: string;
        /**
         * Progressbar bg color
         */
        color: string;
    };
    /**
     * Set progressbar details
     * @param {"TRACK"|"BAR"} type Progressbar type
     * @param {string} color Color to set
     * @returns {Spotify}
     */
    setProgressBar(type: "TRACK" | "BAR", color: string): Spotify;
    /**
     * Set title
     * @param {string} title Title to set
     * @returns {Spotify}
     */
    setTitle(title: string): Spotify;
    /**
     * Set image
     * @param {string|Buffer|Canvas.Image} source Image source
     * @returns {Spotify}
     */
    setImage(source: string | Buffer | Canvas.Image): Spotify;
    /**
     * Set artist name
     * @param {string} name Artist name
     * @returns {Spotify}
     */
    setAuthor(name: string): Spotify;
    /**
     * Set album name
     * @param {string} name Album name
     * @returns {Spotify}
     */
    setAlbum(name: string): Spotify;
    /**
     * Set start timestamp
     * @param {Date|number} time Timestamp
     * @returns {Spotify}
     */
    setStartTimestamp(time: Date | number): Spotify;
    /**
     * Set end timestamp
     * @param {Date|number} time Timestamp
     * @returns {Spotify}
     */
    setEndTimestamp(time: Date | number): Spotify;
    /**
     * Set background
     * @param {"COLOR"|"IMAGE"} type Background type
     * @param {string|Buffer|Canvas.Image} data Background data
     * @returns {Spotify}
     */
    setBackground(type?: "COLOR" | "IMAGE", data?: string | Buffer | Canvas.Image): Spotify;
    /**
     * This function converts raw data into spotify presence card.
     * @returns {Promise<Buffer>}
     */
    build(): Promise<Buffer>;
    /**
     * Returns progress
     * @type {number}
     * @private
     * @ignore
     */
    private __calculateProgress;
}
import Canvas = require("@napi-rs/canvas");
//# sourceMappingURL=Spotify.d.ts.map