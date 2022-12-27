"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTypeError = void 0;
class InvalidTypeError extends Error {
    constructor(name, expected, received) {
        super(`"${name}" must be a type of "${expected}" but received type of "${received}".`);
    }
}
exports.InvalidTypeError = InvalidTypeError;
