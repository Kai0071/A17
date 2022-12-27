export = Greeting;
declare class Greeting {
    username: string;
    guildName: string;
    colorTitleBorder: string;
    colorMemberCount: string;
    textMemberCount: string;
    memberCount: number;
    backgroundImage: string;
    avatar: string | Buffer;
    opacityBorder: number;
    colorBorder: string;
    colorUsername: string;
    colorUsernameBox: string;
    opacityUsernameBox: number;
    discriminator: string;
    colorDiscriminator: string;
    opacityDiscriminatorBox: number;
    colorDiscriminatorBox: string;
    colorMessage: string;
    colorHashtag: string;
    colorBackground: string;
    /**
     * Set avatar
     * @param {string|Buffer} value The avatar
     * @returns {Greeting}
     */
    setAvatar(value: string | Buffer): Greeting;
    /**
     * Sets discriminator
     * @param {string} value the discriminator
     * @returns {Greeting}
     */
    setDiscriminator(value: string): Greeting;
    /**
     * Set username
     * @param {string} value The username
     * @returns {Greeting}
     */
    setUsername(value: string): Greeting;
    /**
     * Set guild name
     * @param {string} value The guild name
     * @returns {Greeting}
     */
    setGuildName(value: string): Greeting;
    /**
     * Sets member count
     * @param {number} value The member count
     * @returns {Greeting}
     */
    setMemberCount(value: number): Greeting;
    /**
     * Set background image
     * @param {string|Buffer} value The background image
     * @returns {Greeting}
     */
    setBackground(value: string | Buffer): Greeting;
    /**
     * Sets color
     * @param {string} variable The variable to set the color at
     * @param {string} value The color
     * @returns {Greeting}
     */
    setColor(variable: string, value: string): Greeting;
    /**
     * Sets text
     * @param {string} variable The variable to set the text at
     * @param {string} value The text
     * @returns {Greeting}
     */
    setText(variable: string, value: string): Greeting;
    /**
     * Sets opacity
     * @param {string} variable Sets the opacity of the given variable
     * @param {number} value The opacity to set
     * @returns {Greeting}
     */
    setOpacity(variable: string, value: number): Greeting;
    /**
     * Builds the image
     * @returns {Promise<Canvas.Canvas>}
     */
    toAttachment(): Promise<Canvas.Canvas>;
    /**
     * Builds the image
     * @returns {Promise<Buffer>}
     */
    build(): Promise<Buffer>;
}
import Canvas = require("@napi-rs/canvas");
//# sourceMappingURL=GreetingsCard.d.ts.map