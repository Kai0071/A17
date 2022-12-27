import { IOptionObject, IResponseObject } from "./interfaces";
/**
 * Now using the standard nodejs modules instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToChevereto.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 *
 * @param {string} apiKey - Your Chevereto API key
 * @param {string} image - Typically, the output of fileToString("path") function
 * @param {string} cheveretoHost - Chevereto host; ccepts explicit protocol & port
 * @param {Object} customPayload - Custom payload object that'll be spreaded into the request payload
 *
 * @returns A promise. Use `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */
interface IPostParams extends IOptionObject {
    image: string;
    cheveretoHost: string;
}
export declare const postToChevereto: (params: IPostParams) => Promise<string | IResponseObject>;
export {};
