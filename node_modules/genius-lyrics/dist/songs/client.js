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
exports.SongsClient = void 0;
const http_1 = require("../helpers/http");
const song_1 = require("./song");
const constants_1 = require("../helpers/constants");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
class SongsClient {
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Searches for songs for the provided query (Key is optional)
     * @example const SearchResults = await SongsClient.search("faded");
     */
    search(query, options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isString)(query)) {
                throw new errors_1.InvalidTypeError("query", "string", typeof query);
            }
            const nOptions = {
                sanitizeQuery: (_a = options === null || options === void 0 ? void 0 : options.sanitizeQuery) !== null && _a !== void 0 ? _a : true,
            };
            const encodedQuery = encodeURIComponent(nOptions.sanitizeQuery ? this.sanitizeQuery(query) : query);
            let result = [];
            if ((0, types_1.isString)(this.client.key)) {
                const data = yield this.client.api.get(`/search?q=${encodedQuery}`);
                const parsed = JSON.parse(data);
                result = parsed.response.hits;
            }
            else {
                const res = yield (0, http_1.request)(`${((_b = this.client.config.origin) === null || _b === void 0 ? void 0 : _b.url) || constants_1.Constants.unofficialApiURL}/search/song?per_page=5&q=${encodedQuery}`, Object.assign(Object.assign({}, this.client.config.requestOptions), { headers: Object.assign({ "User-Agent": constants_1.Constants.defaultUserAgent }, (_c = this.client.config.requestOptions) === null || _c === void 0 ? void 0 : _c.headers) }));
                const parsed = JSON.parse(yield res.body.text());
                if (!((_d = parsed === null || parsed === void 0 ? void 0 : parsed.response) === null || _d === void 0 ? void 0 : _d.sections)) {
                    throw new errors_1.NoResultError();
                }
                result = parsed.response.sections.reduce((pv, x) => [...pv, ...x.hits], []);
            }
            return result
                .filter((s) => s.type === "song")
                .map((s) => new song_1.Song(this.client, s.result, true));
        });
    }
    /**
     * Fetches the Song using the provided ID (Requires Key)
     * @example const Song = await SongsClient.get(3276244);
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isString)(this.client.key)) {
                throw new errors_1.RequiresGeniusKeyError();
            }
            if (!(0, types_1.isNumber)(id)) {
                throw new errors_1.InvalidTypeError("id", "number", typeof id);
            }
            const data = yield this.client.api.get(`/songs/${id}`);
            const parsed = JSON.parse(data);
            return new song_1.Song(this.client, parsed.response.song, false);
        });
    }
    // Source: https://github.com/farshed/genius-lyrics-api/blob/110397a9f05fe20c4ded92418430f665f074c4e4/lib/utils/index.js#L15
    sanitizeQuery(query) {
        return query
            .toLowerCase()
            .replace(/ *\([^)]*\) */g, "")
            .replace(/ *\[[^\]]*]/, "")
            .replace(/feat\.|ft\./g, "")
            .replace(/\s+/g, " ")
            .trim();
    }
}
exports.SongsClient = SongsClient;
