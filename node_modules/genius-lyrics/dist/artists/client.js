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
exports.ArtistsClient = void 0;
const artist_1 = require("./artist");
const errors_1 = require("../errors");
const types_1 = require("../helpers/types");
class ArtistsClient {
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Fetches the Artist using the provided ID (Requires Key)
     * @example const Artist = await ArtistsClient.get(456537);
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, types_1.isString)(this.client.key)) {
                throw new errors_1.RequiresGeniusKeyError();
            }
            if (!(0, types_1.isNumber)(id)) {
                throw new errors_1.InvalidTypeError("id", "number", typeof id);
            }
            const data = yield this.client.api.get(`/artists/${id}`);
            const parsed = JSON.parse(data);
            return new artist_1.Artist(this.client, parsed.response.artist, false);
        });
    }
}
exports.ArtistsClient = ArtistsClient;
