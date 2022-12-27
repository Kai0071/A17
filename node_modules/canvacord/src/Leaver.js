const Base = require("./base/GreetingsCard");
const Util = require("./Util");

class Leaver extends Base {

    /**
     * Leaver image builder
     * @see https://www.discord-canvas.net/functions/goodbye
     * @example
     * const card = new canvacord.Leaver()
            .setUsername("Snowflake")
            .setDiscriminator("0007")
            .setGuildName("Snowflake Studio");

        card.build()
            .then(data => {
                canvacord.write(data, "leaver.png");
            })
     */
    constructor() {
        super();

        /**
         * Title created with Canvacord
         * @type {string}
         */
        this.textTitle = "GOODBYE";

        /**
         * Text message created with Canvacord
         * @type {string}
         */
        this.textMessage = "We will miss you!";

        /**
         * Title color created with canvacord
         * @type {string}
         */
        this.colorTitle = "#03A9F4";

        // update default data
        this.__updateData();
    }

    /**
     * Updates default state
     * @returns {void}
     * @private
     * @ignore
     */
    __updateData() {
        this.setUsername("Discord User");
        this.setDiscriminator("0000");
        this.setMemberCount(100);
        this.setGuildName("Discord Server");
        this.setAvatar(`https://cdn.discordapp.com/embed/avatars/0.png`);
        this.setColor("border", "#ff4a4a");
        this.setColor("username-box", "#ff4a4a");
        this.setColor("discriminator-box", "#ff4a4a");
        this.setColor("message-box", "#ff4a4a");
        this.setColor("title", "#ff4a4a");
        this.setColor("avatar", "#ff4a4a");
    }

    /**
     * Set color
     * @param {"title"|"title-border"|"avatar"|"username"|"username-box"|"hashtag"|"discriminator"|"discriminator-box"|"message"|"message-box"|"member-count"|"background"|"border"} id
     * @param {string} color HTML5 color code
     * @returns {Leaver}
     */
    setColor(id, color) {
        super.setColor(id, color);
        return this;
    }

    /**
     * Ser member count
     * @param {number|string} memberCount Guild member count
     * @returns {Leaver}
     */
    setMemberCount(memberCount = 100) {
        super.setMemberCount(Util.toAbbrev(memberCount));
        return this;
    }

    /**
     * Builds welcome image
     * @returns {Promise<Buffer>}
     */
    async build() {
        return (await this.toAttachment()).encode("png");
    }

}

module.exports = Leaver;