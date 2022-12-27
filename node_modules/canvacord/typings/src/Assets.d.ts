export = CanvacordAssets;
declare class CanvacordAssets {
    static load: typeof loadAssets;
    static ASSETS_DIR: string;
    static font: {
        get(name: any): any;
        getMetadata(name: any): any;
        all(): {};
    };
    static image: {
        get(name: any): any;
        getMetadata(name: any): any;
        all(): {};
    };
}
declare function loadAssets(warnIfFailed?: boolean): void;
//# sourceMappingURL=Assets.d.ts.map