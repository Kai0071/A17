import { MethodlessRequestOptions } from "./http";
export interface Config {
    requestOptions?: MethodlessRequestOptions;
    origin?: {
        api?: string;
        url?: string;
    };
}
export declare const isValidConfig: (config: any) => config is Config;
