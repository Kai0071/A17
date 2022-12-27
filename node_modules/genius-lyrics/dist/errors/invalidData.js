"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDataError = void 0;
class InvalidDataError extends Error {
    constructor() {
        super("Received invalid response data");
    }
}
exports.InvalidDataError = InvalidDataError;
