"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidConfig = void 0;
const types_1 = require("./types");
const isValidConfig = (config) => (0, types_1.isObject)(config) &&
    ((0, types_1.isUndefined)(config.requestOptions) || (0, types_1.isObject)(config.requestOptions)) &&
    ((0, types_1.isUndefined)(config.origin) ||
        ((0, types_1.isObject)(config.origin) &&
            ((0, types_1.isUndefined)(config.origin.api) || (0, types_1.isString)(config.origin.api)) &&
            ((0, types_1.isUndefined)(config.origin.url) || (0, types_1.isString)(config.origin.url))));
exports.isValidConfig = isValidConfig;
