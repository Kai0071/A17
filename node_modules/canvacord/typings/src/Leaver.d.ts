export = Leaver;
declare class Leaver extends Base {
    /**
     * Title created with Canvacord
     * @type {string}
     */
    textTitle: string;
    /**
     * Text message created with Canvacord
     * @type {string}
     */
    textMessage: string;
    /**
     * Title color created with canvacord
     * @type {string}
     */
    colorTitle: string;
    /**
     * Updates default state
     * @returns {void}
     * @private
     * @ignore
     */
    private __updateData;
    /**
     * Set color
     * @param {"title"|"title-border"|"avatar"|"username"|"username-box"|"hashtag"|"discriminator"|"discriminator-box"|"message"|"message-box"|"member-count"|"background"|"border"} id
     * @param {string} color HTML5 color code
     * @returns {Leaver}
     */
    setColor(id: "title" | "title-border" | "avatar" | "username" | "username-box" | "hashtag" | "discriminator" | "discriminator-box" | "message" | "message-box" | "member-count" | "background" | "border", color: string): Leaver;
    /**
     * Ser member count
     * @param {number|string} memberCount Guild member count
     * @returns {Leaver}
     */
    setMemberCount(memberCount?: number | string): Leaver;
}
import Base = require("./base/GreetingsCard");
//# sourceMappingURL=Leaver.d.ts.map