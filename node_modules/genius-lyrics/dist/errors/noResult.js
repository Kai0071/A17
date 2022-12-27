"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoResultError = void 0;
class NoResultError extends Error {
    constructor() {
        super("No result was found");
    }
}
exports.NoResultError = NoResultError;
