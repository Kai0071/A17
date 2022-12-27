"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresGeniusKeyError = void 0;
class RequiresGeniusKeyError extends Error {
    constructor() {
        super("This action requires a valid Genius Token");
    }
}
exports.RequiresGeniusKeyError = RequiresGeniusKeyError;
