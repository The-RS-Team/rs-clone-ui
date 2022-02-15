import {CardItemInterface} from "./card-item.interface";
import {FileInterface} from "./file.interface";

export interface CardInterface {
    id?: string;
    title: string;
    description: string;
    position: number;
    columnId: string;
    files: FileInterface[];
    cardItems: CardItemInterface[];
    cover: string;
}

