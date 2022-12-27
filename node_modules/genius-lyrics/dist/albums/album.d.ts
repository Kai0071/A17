import { Artist } from "../artists/artist";
export declare class Album {
    name: string;
    title: string;
    id: number;
    image: string;
    url: string;
    endpoint: string;
    artist: Artist;
    partial: boolean;
    _raw: any;
    constructor(res: any, artist: Artist);
}
