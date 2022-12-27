import { IOptionObject, IResponseObject } from "./interfaces";
/**
 * Upload local pictures files to imgBB API (or other Chevereto instances) & get display URLs in response.
 *
 * @param {string} apiKey - Your API key
 * @param {string} pathToFile - Path to your file
 *
 * @param {Object} options - OPTIONAL: pass Option object as parameter
 * @param {string} options.apiKey - Your API key
 * @param {string} options.imagePath - Path to your image
 * @param {string} options.name - Custom name for your file
 * @param {string} options.expiration - Expiration value in seconds
 * @param {string} options.base64string - Upload a base64 string (alternative to options.imagePath)
 * @param {string} options.imageUrl - URL of your image (32Mb max)
 * @param {string} options.cheveretoHost - Define to switch into 'chevereto mode'
 * @param {string} options.customPayload - Pass custom key-value pairs (in chevereto mode only)
 *
 * @returns {Promise.<ResponseObject>}
 * A promise. See [README](https://github.com/TheRealBarenziah/imgbb-uploader#use) for more infos
 *
 * @example
 *     imgbbUploader({
 *         apiKey: process.env.IMGBB_API_KEY,
 *         name: "customFilename",
 *         expiration: 3600,
 *         imagePath: "./your/image/path.png"
 *       })
 *       .then(res => console.log(res))
 *       .catch(err => console.error(err))
 */
declare const imgbbUploader: (...args: string[] | IOptionObject[]) => Promise<IResponseObject | string>;
export { imgbbUploader };
