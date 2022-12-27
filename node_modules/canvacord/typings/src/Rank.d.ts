export = Rank;
/**
 * @typedef {object} CanvacordRankData
 * @property {number} width Rank card width
 * @property {number} height Rank card height
 * @property {object} background Rank card background data
 * @property {"image"|"color"} [background.type="color"] Background type
 * @property {string|Buffer} [background.image="#23272A"] Background image (or color)
 * @property {object} progressBar Progressbar data
 * @property {boolean} [progressBar.rounded=true] If the progressbar should be rounded
 * @property {number} [progressBar.x=275.5] Progressbar X
 * @property {number} [progressBar.y=183.75] Progressbar Y
 * @property {number} [progressBar.height=37.5] Progressbar height
 * @property {number} [progressBar.width=596.5] Progressbar width
 * @property {object} [progressBar.track] Progressbar track
 * @property {string} [progressBar.track.color="#484b4E"] Progressbar track color
 * @property {object} [progressBar.bar] Progressbar bar data
 * @property {"color"|"gradient"} [progressBar.bar.type="color"] Progressbar bar type
 * @property {string|string[]} [progressBar.bar.color="#FFFFFF"] Progressbar bar color
 * @property {object} overlay Progressbar overlay
 * @property {boolean} [overlay.display=true] If it should display overlay
 * @property {number} [overlay.level=0.5] Overlay opacity level
 * @property {string} [overlay.color="#333640"] Overlay bg color
 * @property {object} avatar Rank card avatar data
 * @property {string|Buffer} [avatar.source=null] Avatar source
 * @property {number} [avatar.x=70] X
 * @property {number} [avatar.y=50] Y
 * @property {number} [avatar.height=180] height
 * @property {number} [avatar.width=180] width
 * @property {object} status Rank card status
 * @property {number} [status.width=5] Status width
 * @property {"online"|"dnd"|"idle"|"offline"|"streaming"} [status.type] Status type
 * @property {string} [status.color="#43B581"] Status color
 * @property {boolean} [status.circle=false] Circualr status?
 * @property {object} rank Rank card rank data
 * @property {boolean} [rank.display=true] If it should display rank
 * @property {number} [rank.data=1] The Rank
 * @property {string} [rank.textColor="#FFFFFF"] Rank text color
 * @property {string} [rank.color="#F3F3F3"] Rank color
 * @property {string} [rank.displayText="RANK"] Rank display text
 * @property {object} level Rank card level data
 * @property {boolean} [level.display=true] If it should display level
 * @property {number} [level.data=1] The level
 * @property {string} [level.textColor="#FFFFFF"] level text color
 * @property {string} [level.color="#F3F3F3"] level color
 * @property {string} [level.displayText="LEVEL"] level display text
 * @property {object} currentXP Rank card current xp
 * @property {number} [currentXP.data=0] Current xp
 * @property {string} [currentXP.color="#FFFFFF"] Rank card current xp color
 * @property {object} requiredXP Rank card required xp
 * @property {number} [requiredXP.data=0] required xp
 * @property {string} [requiredXP.color="#FFFFFF"] Rank card required xp color
 * @property {object} discriminator Rank card discriminator
 * @property {number|string} [discriminator.discrim=null] The discriminator
 * @property {string} [discriminator.color="rgba(255, 255, 255, 0.4)"] Rank card discriminator color
 * @property {object} username Username Data
 * @property {string} [username.name=null] Rank card username
 * @property {string} [username.color="#FFFFFF"] Rank card username color
 * @property {boolean} [renderEmojis=false] If it should render emojis
 */
declare class Rank {
    /**
     * Rank card data
     * @type {CanvacordRankData}
     */
    data: CanvacordRankData;
    /**
     * Loads font
     * @param {any[]} fontArray Font array
     * @returns {Rank}
     */
    registerFonts(fontArray?: any[]): Rank;
    /**
     * If it should render username with emojis (if any)
     * @param {boolean} [apply=false] Set it to `true` to render emojis.
     * @returns {Rank}
     */
    renderEmojis(apply?: boolean): Rank;
    /**
     * Set font size
     * @param {string} size
     * @returns {Rank}
     */
    setFontSize(size: string): Rank;
    /**
     * Set username
     * @param {string} name Username
     * @param {string} color Username color
     * @returns {Rank}
     */
    setUsername(name: string, color?: string): Rank;
    /**
     * Set discriminator
     * @param {string|number} discriminator User discriminator
     * @param {string} color Discriminator color
     * @returns {Rank}
     */
    setDiscriminator(discriminator: string | number, color?: string): Rank;
    /**
     * Set progressbar style
     * @param {string|string[]} color Progressbar Color
     * @param {"COLOR"|"GRADIENT"} [fillType] Progressbar type
     * @param {boolean} [rounded=true] If progressbar should have rounded edges
     * @returns {Rank}
     */
    setProgressBar(color: string | string[], fillType?: "COLOR" | "GRADIENT", rounded?: boolean): Rank;
    /**
     * Set progressbar track
     * @param {string} color Track color
     * @returns {Rank}
     */
    setProgressBarTrack(color: string): Rank;
    /**
     * Set card overlay
     * @param {string} color Overlay color
     * @param {number} [level=0.5] Opacity level
     * @param {boolean} [display=true] IF it should display overlay
     * @returns {Rank}
     */
    setOverlay(color: string, level?: number, display?: boolean): Rank;
    /**
     * Set required xp
     * @param {number} data Required xp
     * @param {string} color Color
     * @returns {Rank}
     */
    setRequiredXP(data: number, color?: string): Rank;
    /**
     * Set current xp
     * @param {number} data Current xp
     * @param {string} color Color
     * @returns {Rank}
     */
    setCurrentXP(data: number, color?: string): Rank;
    /**
     * Set Rank
     * @param {number} data Current Rank
     * @param {string} text Display text
     * @param {boolean} [display=true] If it should display rank
     * @returns {Rank}
     */
    setRank(data: number, text?: string, display?: boolean): Rank;
    /**
     * Set rank display color
     * @param {string} text text color
     * @param {string} number Number color
     * @returns {Rank}
     */
    setRankColor(text?: string, number?: string): Rank;
    /**
     * Set level color
     * @param {string} text text color
     * @param {string} number number color
     * @returns {Rank}
     */
    setLevelColor(text?: string, number?: string): Rank;
    /**
     * Set Level
     * @param {number} data Current Level
     * @param {string} text Display text
     * @param {boolean} [display=true] If it should display level
     * @returns {Rank}
     */
    setLevel(data: number, text?: string, display?: boolean): Rank;
    /**
     * Set custom status color
     * @param {string} color Color to set
     * @returns {Rank}
     */
    setCustomStatusColor(color: string): Rank;
    /**
     * Set status
     * @param {"online"|"idle"|"dnd"|"offline"|"streaming"} status User status
     * @param {boolean} circle If status icon should be circular.
     * @param {number|boolean} width Status width
     * @returns {Rank}
     */
    setStatus(status: "online" | "idle" | "dnd" | "offline" | "streaming", circle?: boolean, width?: number | boolean): Rank;
    /**
     * Set background image/color
     * @param {"COLOR"|"IMAGE"} type Background type
     * @param {string|Buffer} [data] Background color or image
     * @returns {Rank}
     */
    setBackground(type: "COLOR" | "IMAGE", data?: string | Buffer): Rank;
    /**
     * User avatar
     * @param {string|Buffer} data Avatar data
     * @returns {Rank}
     */
    setAvatar(data: string | Buffer): Rank;
    /**
     * Builds rank card
     * @param {object} ops Fonts
     * @param {string} [ops.fontX="MANROPE_BOLD"] Bold font family
     * @param {string} [ops.fontY="MANROPE_REGULAR"] Regular font family
     * @returns {Promise<Buffer>}
     */
    build(ops?: {
        fontX?: string;
        fontY?: string;
    }): Promise<Buffer>;
    /**
     * Calculates progress
     * @type {number}
     * @private
     * @ignore
     */
    private get _calculateProgress();
}
declare namespace Rank {
    export { CanvacordRankData };
}
type CanvacordRankData = {
    /**
     * Rank card width
     */
    width: number;
    /**
     * Rank card height
     */
    height: number;
    /**
     * Rank card background data
     */
    background: {
        type?: "image" | "color";
        image?: string | Buffer;
    };
    /**
     * Progressbar data
     */
    progressBar: {
        rounded?: boolean;
        x?: number;
        y?: number;
        height?: number;
        width?: number;
        track?: {
            color?: string;
        };
        bar?: {
            type?: "color" | "gradient";
            color?: string | string[];
        };
    };
    /**
     * Progressbar overlay
     */
    overlay: {
        display?: boolean;
        level?: number;
        color?: string;
    };
    /**
     * Rank card avatar data
     */
    avatar: {
        source?: string | Buffer;
        x?: number;
        y?: number;
        height?: number;
        width?: number;
    };
    /**
     * Rank card status
     */
    status: {
        width?: number;
        type?: "online" | "dnd" | "idle" | "offline" | "streaming";
        color?: string;
        circle?: boolean;
    };
    /**
     * Rank card rank data
     */
    rank: {
        display?: boolean;
        data?: number;
        textColor?: string;
        color?: string;
        displayText?: string;
    };
    /**
     * Rank card level data
     */
    level: {
        display?: boolean;
        data?: number;
        textColor?: string;
        color?: string;
        displayText?: string;
    };
    /**
     * Rank card current xp
     */
    currentXP: {
        data?: number;
        color?: string;
    };
    /**
     * Rank card required xp
     */
    requiredXP: {
        data?: number;
        color?: string;
    };
    /**
     * Rank card discriminator
     */
    discriminator: {
        discrim?: number | string;
        color?: string;
    };
    /**
     * Username Data
     */
    username: {
        name?: string;
        color?: string;
    };
    /**
     * If it should render emojis
     */
    renderEmojis?: boolean;
};
//# sourceMappingURL=Rank.d.ts.map