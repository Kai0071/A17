import fs from "fs";
import { fileToString } from "./fileToString";
export const isFile = async (path) => {
    return await fs.promises
        .lstat(path)
        .then((res) => res.isFile())
        .catch(() => false);
};
/**
 * Formally validate input 2 strings params
 *
 * @param {string} apiKey - Should be 32-character long string
 * @param {string} path - Should be a valid file path
 *
 * @returns {Promise.<Boolean>}
 * A promise that resolve to `true` if things are looking good, and to `false` otherwise
 */
export const validateStringInput = async (apiKey, path) => {
    return (await isFile(path)) && apiKey ? true : false;
};
const validateImageInput = async ({ imagePath, base64string, imageUrl }) => {
    const oopsie = Error("A single input key must be defined between: 'imagePath', 'imageUrl', 'base64string'.");
    if (imagePath) {
        const validPath = await isFile(imagePath);
        if (base64string || imageUrl) {
            throw oopsie;
        }
        else if (!validPath) {
            throw Error(`'imagePath' seem invalid (${imagePath})`);
        }
        else {
            return await fileToString(imagePath);
        }
    }
    else if (base64string) {
        if (imageUrl) {
            throw oopsie;
        }
        else {
            return base64string;
        }
    }
    else if (imageUrl) {
        return imageUrl;
    }
    else {
        throw oopsie;
    }
};
/**
 * Formally validate option object. Either return proper string or throws
 *
 * @param {IOptions} options - The options object as described in the docs
 *
 * @returns {Promise.<Boolean>}
 * A promise that resolve to a valid "image" value if things are looking good, and throws otherwise
 */
export const validateOptionObject = async (options) => {
    try {
        const { imagePath = undefined, apiKey = undefined, expiration = undefined, base64string = undefined, imageUrl = undefined, cheveretoHost = undefined, } = {
            ...options,
        };
        // case 1: validate inputs before !imgBB chevereto API call
        if (cheveretoHost) {
            return validateImageInput({
                imagePath,
                imageUrl,
                base64string,
            });
        }
        // case 2: validate inputs before imgBB API call
        else {
            if (!apiKey)
                throw new Error("no 'apiKey' provided.");
            if (expiration) {
                if (typeof expiration !== "number") {
                    throw new Error("'expiration' value must be a number.");
                }
                if (Number(expiration) < 60 || Number(expiration) > 15552000) {
                    throw new Error("'expiration' value must be in 60-15552000 range.");
                }
            }
            // todo: if(!nameLooksValid(name))...
            return validateImageInput({
                apiKey,
                imagePath,
                imageUrl,
                base64string,
            });
        }
    }
    catch (e) {
        throw new Error(String(e));
    }
};
