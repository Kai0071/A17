import { IOptionObject, IResponseObject } from "./interfaces";
/**
 * Now using the standard 'https' module instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToImgbb.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 *
 * @param {string} apiKey - Your imgBB API key
 * @param {string} image - Typically, the output of fileToString("path") function
 *
 * @returns A promise. [README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */
interface IPostParams extends IOptionObject {
    image: string;
}
export declare const postToImgbb: (params: IPostParams) => Promise<IResponseObject>;
export {};
