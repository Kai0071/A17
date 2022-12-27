"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidGeniusKeyError = void 0;
class InvalidGeniusKeyError extends Error {
    constructor() {
        super("Invalid Genius Token");
    }
}
exports.InvalidGeniusKeyError = InvalidGeniusKeyError;
