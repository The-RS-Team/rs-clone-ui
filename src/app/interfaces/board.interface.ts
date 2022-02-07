import {ColumnInterface} from './column.interface';

export interface BoardInterface {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    background: string;
    columns: ColumnInterface[];
}

export interface UnsplashImg {
    "urls": {
        "raw": string
        "full": string
        "regular": string
        "small": string
        "thumb": string
    }
}