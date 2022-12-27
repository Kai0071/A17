import { IOptionObject } from "./interfaces";
export declare const isFile: (path: string) => Promise<boolean>;
/**
 * Formally validate input 2 strings params
 *
 * @param {string} apiKey - Should be 32-character long string
 * @param {string} path - Should be a valid file path
 *
 * @returns {Promise.<Boolean>}
 * A promise that resolve to `true` if things are looking good, and to `false` otherwise
 */
export declare const validateStringInput: (apiKey: string | undefined, path: string) => Promise<boolean>;
/**
 * Formally validate option object. Either return proper string or throws
 *
 * @param {IOptions} options - The options object as described in the docs
 *
 * @returns {Promise.<Boolean>}
 * A promise that resolve to a valid "image" value if things are looking good, and throws otherwise
 */
export declare const validateOptionObject: (options: IOptionObject) => Promise<string>;
