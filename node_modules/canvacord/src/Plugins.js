/**
 * @typedef {object} Plugins
 * @property {Function} circle Circle plugin
 * @property {Function} convolute Convolute plugin
 * @property {Function} rectangle Rectangle plugin
 * @property {Function} round Round plugin
 * @property {Function} abbrev Abbrev plugin
 * @property {Function} renderEmoji Emoji rendering plugin
 */
const data = {
    circle: require("../plugins/circle"),
    convolute: require("../plugins/convolute"),
    rectangle: require("../plugins/rect"),
    round: require("../plugins/round"),
    abbrev: require("../plugins/abbrev"),
    renderEmoji: require("../plugins/renderEmoji")
};

module.exports = data;