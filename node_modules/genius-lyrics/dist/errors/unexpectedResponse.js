"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedResponseError = void 0;
class UnexpectedResponseError extends Error {
    constructor(error) {
        super(`Returned ${error.statusCode} with message: ${error}`);
        this.error = error;
    }
}
exports.UnexpectedResponseError = UnexpectedResponseError;
