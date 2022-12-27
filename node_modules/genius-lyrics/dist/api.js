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
exports.ApiClient = void 0;
const http_1 = require("./helpers/http");
const errors_1 = require("./errors");
class ApiClient {
    constructor(url, options) {
        this.url = url;
        this.options = options;
    }
    get(route, headers) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = yield (0, http_1.request)(`${this.url}${route}`, Object.assign(Object.assign({}, this.options), { headers: Object.assign(Object.assign({}, headers), (_a = this.options) === null || _a === void 0 ? void 0 : _a.headers), throwOnError: true }));
                return body.text();
            }
            catch (err) {
                throw this._handleError(err);
            }
        });
    }
    _handleError(error) {
        if (error instanceof http_1.errors.ResponseStatusCodeError) {
            switch (error.statusCode) {
                case 401:
                    return new errors_1.InvalidGeniusKeyError();
                case 404:
                    return new errors_1.NoResultError();
                default:
                    return new errors_1.UnexpectedResponseError(error);
            }
        }
        return error;
    }
}
exports.ApiClient = ApiClient;
