import Canvacord from "./src/Canvacord";
import Rank from "./src/Rank";
import Spotify from "./src/Spotify";
import Welcomer from "./src/Welcomer";
import Leaver from "./src/Leaver";
import Greeting from "./src/base/GreetingsCard";
import Plugins from "./src/Plugins";
import Util from "./src/Util";
import Assets from "./src/Assets";

interface MiscellaneousExtensions {
    Brightness: typeof import("./libs/Brightness");
    Convolute: typeof import("./libs/Convolute");
    Darkness: typeof import("./libs/Darkness");
    Greyscale: typeof import("./libs/Greyscale");
    Invert: typeof import("./libs/Invert");
    Sepia: typeof import("./libs/Sepia");
    Threshold: typeof import("./libs/Threshold");
    Trigger: typeof import("./libs/Trigger");
}

export const ConvolutionMatrix: typeof Canvacord.CONVOLUTION_MATRIX;
export const MSX: MiscellaneousExtensions;
export const write: (data: Buffer, name: string) => void;
export const author: string;
export const version: string;
export type CanvacordRankData = Rank.CanvacordRankData;

export {
    Canvacord,
    Canvacord as Canvas,
    Rank,
    Spotify,
    Welcomer,
    Leaver,
    Greeting,
    Plugins,
    Assets,
    Util,
};