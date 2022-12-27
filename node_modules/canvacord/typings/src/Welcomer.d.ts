export = Welcomer;
declare class Welcomer extends Base {
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
     * @private
     * @ignore
     */
    private __updateData;
    /**
     * Set color
     * @param {"title"|"title-border"|"avatar"|"username"|"username-box"|"hashtag"|"discriminator"|"discriminator-box"|"message"|"message-box"|"member-count"|"background"|"border"} id
     * @param {string} color HTML5 color code
     * @returns {Welcomer}
     */
    setColor(id: "title" | "title-border" | "avatar" | "username" | "username-box" | "hashtag" | "discriminator" | "discriminator-box" | "message" | "message-box" | "member-count" | "background" | "border", color: string): Welcomer;
    /**
     * Ser member count
     * @param {number|string} memberCount Guild member count
     * @returns {Welcomer}
     */
    setMemberCount(memberCount?: number | string): Welcomer;
}
import Base = require("./base/GreetingsCard");
//# sourceMappingURL=Welcomer.d.ts.map