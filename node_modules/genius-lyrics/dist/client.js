"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const constants_1 = require("./helpers/constants");
const api_1 = require("./api");
const client_1 = require("./artists/client");
const client_2 = require("./songs/client");
const config_1 = require("./helpers/config");
const errors_1 = require("./errors");
const types_1 = require("./helpers/types");
class Client {
    constructor(key, config = {}) {
        var _a;
        this.key = key;
        this.config = config;
        if (!(0, types_1.isUndefined)(key) && !(0, types_1.isString)(key)) {
            throw new errors_1.InvalidTypeError("key", (0, types_1.joinTypes)("string", "undefined"), typeof key);
        }
        if (!(0, config_1.isValidConfig)(config)) {
            throw new errors_1.InvalidTypeError("config", "Config", typeof config);
        }
        this.songs = new client_2.SongsClient(this);
        this.artists = new client_1.ArtistsClient(this);
        this.api = new api_1.ApiClient(((_a = this.config.origin) === null || _a === void 0 ? void 0 : _a.api) || constants_1.Constants.officialApiURL, {
            headers: {
                "User-Agent": constants_1.Constants.defaultUserAgent,
                Authorization: `Bearer ${this.key}`,
            },
        });
    }
}
exports.Client = Client;
