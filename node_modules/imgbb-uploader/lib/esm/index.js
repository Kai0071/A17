import { fileToString } from "./fileToString";
import { postToImgbb } from "./postToImgbb";
import { validateOptionObject, validateStringInput } from "./validateInput";
import { postToChevereto } from "./postToChevereto";
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
const imgbbUploader = async (...args) => {
    // handle two string params to ensure retrocompatibility
    if (args.length === 2) {
        if (await validateStringInput(String(args[0]), String(args[1]))) {
            const image = await fileToString(String(args[1]));
            return postToImgbb({
                apiKey: String(args[0]),
                image,
            });
        }
        else {
            throw new Error("Invalid params: please make sure that first argument is an imgBB API key, and second argument is a valid path to image file.");
        }
    }
    else {
        if (args.length === 1 && typeof args[0] === "object") {
            // handle the option object
            const { apiKey, name, expiration, cheveretoHost, customPayload } = {
                ...args[0],
            };
            try {
                // ensure there is a single defined key between 'imagePath', 'imageUrl' & 'base64string'
                const image = await validateOptionObject({ ...args[0] });
                // no cheveretoHost defined => post to imgBB
                if (!cheveretoHost) {
                    return postToImgbb({
                        apiKey: String(apiKey),
                        image,
                        name,
                        expiration,
                    });
                }
                // cheveretoHost is defined: switch in chevereto mode
                else {
                    return postToChevereto({
                        apiKey: String(apiKey),
                        image,
                        cheveretoHost,
                        customPayload,
                    });
                }
            }
            catch (e) {
                throw new Error(String(e));
            }
        }
        else
            throw new Error(`It seems you didn't pass your arguments properly! Please check the documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master`);
    }
};
export { imgbbUploader };
