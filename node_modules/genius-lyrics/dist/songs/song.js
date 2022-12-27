"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const http_1 = require("../helpers/http");
const cheerio = __importStar(require("cheerio"));
const album_1 = require("../albums/album");
const artist_1 = require("../artists/artist");
const constants_1 = require("../helpers/constants");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
class Song {
    constructor(client, res, partial = false) {
        this.client = client;
        this.partial = partial;
        this.title = res.title;
        this.fullTitle = res.full_title;
        this.featuredTitle = res.title_with_featured;
        this.id = parseInt(res.id);
        this.thumbnail = res.header_image_thumbnail_url;
        this.image = res.header_image_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = new artist_1.Artist(this.client, res.primary_artist, true);
        this.partial = partial;
        this.album =
            !this.partial && res.album
                ? new album_1.Album(res.album, this.artist)
                : undefined;
        this.releasedAt =
            !this.partial && res.release_date
                ? new Date(res.release_date)
                : undefined;
        this.instrumental = res.instrumental;
        this._raw = res;
    }
    /**
     * Fetches Lyrics of the Track
     * @example const Lyrics = await Song.lyrics(true);
     */
    lyrics(removeChorus = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isBoolean)(removeChorus)) {
                throw new errors_1.InvalidTypeError("removeChorus", "boolean", typeof removeChorus);
            }
            const { body } = yield (0, http_1.request)(this.url, Object.assign(Object.assign({}, this.client.config.requestOptions), { headers: Object.assign({ "User-Agent": constants_1.Constants.defaultUserAgent }, (_a = this.client.config.requestOptions) === null || _a === void 0 ? void 0 : _a.headers) }));
            const $ = cheerio.load(yield body.text());
            const selectors = [
                () => $(".lyrics").text().trim(),
                () => $("div[class*='Lyrics__Container']")
                    .toArray()
                    .map((x) => {
                    const ele = $(x);
                    ele.find("br").replaceWith("\n");
                    return ele.text();
                })
                    .join("\n")
                    .trim(),
            ];
            for (const x of selectors) {
                const lyrics = x();
                if (lyrics === null || lyrics === void 0 ? void 0 : lyrics.length) {
                    return removeChorus ? this.removeChorus(lyrics) : lyrics;
                }
            }
            throw new errors_1.NoResultError();
        });
    }
    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @example const NewSong = await Song.fetch();
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isString)(this.client.key)) {
                throw new errors_1.RequiresGeniusKeyError();
            }
            const data = yield this.client.api.get(`/songs/${this.id}`);
            const parsed = JSON.parse(data);
            this.album = parsed.response.song.album
                ? new album_1.Album(parsed.response.song.album, this.artist)
                : undefined;
            this.releasedAt = parsed.response.song.release_date
                ? new Date(parsed.response.song.release_date)
                : undefined;
            this.partial = false;
            return this;
        });
    }
    removeChorus(lyrics) {
        return lyrics.replace(/\[[^\]]+\]\n?/g, "");
    }
}
exports.Song = Song;
