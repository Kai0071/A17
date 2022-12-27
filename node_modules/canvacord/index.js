// Created and maintained by DevAndromeda

const Canvacord = require("./src/Canvacord");

// load default fonts
try {
    Canvacord.registerFonts();
} catch(e) {}

/**
 * @param {stirng} moduleName module name
 */
function load(moduleName) {
    try {
        return require(moduleName);
    } catch(e) {
        return null;
    }
}

module.exports = {
    Canvas: Canvacord,
    Canvacord,
    ConvolutionMatrix: Canvacord.CONVOLUTION_MATRIX,
    Rank: require("./src/Rank"),
    Spotify: require("./src/Spotify"),
    Welcomer: require("./src/Welcomer"),
    Leaver: require("./src/Leaver"),
    Greeting: require("./src/base/GreetingsCard"),
    CaptchaGen: load("captcha-canvas") ? load("captcha-canvas").CaptchaGenerator : null,
    FortniteShop: load("discord-canvas") ? load("discord-canvas").FortniteShop : null,
    FortniteStats: load("discord-canvas") ? load("discord-canvas").FortniteStats : null,
    Plugins: require("./src/Plugins"),
    Util: require("./src/Util"),
    Assets: require("./src/Assets"),
    // MiScellaneous eXtensions
    MSX: {
        Brightness: require("./libs/Brightness"),
        Convolute: require("./libs/Convolute"),
        Darkness: require("./libs/Darkness"),
        Greyscale: require("./libs/Greyscale"),
        Invert: require("./libs/Invert"),
        Sepia: require("./libs/Sepia"),
        Threshold: require("./libs/Threshold"),
        Trigger: require("./libs/Trigger")
    },
    write: Canvacord.write,
    author: "DevAndromeda",
    version: require("./package.json").version
};