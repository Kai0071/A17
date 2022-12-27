"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const artist_1 = require("../artists/artist");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
class Album {
    constructor(res, artist) {
        if (!(0, types_1.isObject)(res) || !(artist instanceof artist_1.Artist)) {
            throw new errors_1.InvalidDataError();
        }
        this.name = res.name;
        this.title = res.title;
        this.id = parseInt(res.id);
        this.image = res.cover_art_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = artist;
        this.partial = true;
        this._raw = res;
    }
}
exports.Album = Album;
