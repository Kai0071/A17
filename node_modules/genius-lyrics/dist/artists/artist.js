"use strict";
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
exports.Artist = exports.ArtistSorts = void 0;
const song_1 = require("../songs/song");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
exports.ArtistSorts = ["title", "popularity"];
class Artist {
    constructor(client, res, partial = false) {
        var _a, _b, _c;
        this.client = client;
        this.partial = partial;
        this.name = res.name;
        this.id = parseInt(res.id);
        this.url = res.url;
        this.thumbnail = res.image_url;
        this.image = res.header_image_url;
        this.iq = (_a = parseInt(res.iq)) !== null && _a !== void 0 ? _a : 0;
        this.verified = {
            normal: res.is_verified,
            meme: res.is_meme_verified,
        };
        this.socialmedia = {
            facebook: (_b = res.facebook_name) !== null && _b !== void 0 ? _b : undefined,
            twitter: (_c = res.twitter_name) !== null && _c !== void 0 ? _c : undefined,
        };
        this._raw = res;
    }
    /**
     * Fetches the songs of the Artist (Requires Key)
     * @example const Songs = await Artist.songs();
     */
    songs(options = {}) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isString)(this.client.key)) {
                throw new errors_1.RequiresGeniusKeyError();
            }
            if (!(0, types_1.isObject)(options)) {
                throw new errors_1.InvalidTypeError("options", "object", typeof options);
            }
            if (!(0, types_1.isUndefined)(options.sort) && !exports.ArtistSorts.includes(options.sort)) {
                throw new errors_1.InvalidTypeError("options.sort", (0, types_1.joinTypes)(...exports.ArtistSorts), typeof options.sort);
            }
            if (!(0, types_1.isUndefined)(options.page) && !(0, types_1.isNumber)(options.page)) {
                throw new errors_1.InvalidTypeError("options.page", (0, types_1.joinTypes)("number", "undefined"), typeof options.page);
            }
            if (!(0, types_1.isUndefined)(options.page) && !(0, types_1.isNumber)(options.page)) {
                throw new errors_1.InvalidTypeError("options.perPage", (0, types_1.joinTypes)("number", "undefined"), typeof options.perPage);
            }
            const nOptions = {
                sort: (_a = options.sort) !== null && _a !== void 0 ? _a : "title",
                page: (_b = options.page) !== null && _b !== void 0 ? _b : 1,
                perPage: (_c = options.perPage) !== null && _c !== void 0 ? _c : 20,
            };
            const data = yield this.client.api.get(`/artists/${this.id}/songs?page=${nOptions.page}&per_page=${nOptions.perPage}&sort=${nOptions.sort}`);
            const parsed = JSON.parse(data);
            return parsed.response.songs.map((s) => new song_1.Song(this.client, s, true));
        });
    }
    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @example const NewArtist = await Artist.fetch();
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isString)(this.client.key)) {
                throw new errors_1.RequiresGeniusKeyError();
            }
            const data = yield this.client.api.get(`/artists/${this.id}`);
            const parsed = JSON.parse(data);
            this.socialmedia.facebook = parsed.artist.facebook_name;
            this.socialmedia.twitter = parsed.artist.twitter_name;
            this._raw = parsed.artist;
            this.partial = false;
            return new Artist(this.client, parsed.artist, false);
        });
    }
}
exports.Artist = Artist;
