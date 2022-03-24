import {CardInterface} from '../interfaces/card.interface';
import {CardItemInterface} from "../interfaces/card-item.interface";
import {FileInterface} from "../interfaces/file.interface";

export class Card implements CardInterface {
    id?: string;
    title: string;
    description: string;
    columnId: string;
    position: number;
    files: FileInterface[];
    cardItems: CardItemInterface[];
    cover: string;

    constructor(id: string, title: string, description: string, columnId: string, position: number, cardItems: CardItemInterface[], files: FileInterface[],cover: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columnId = columnId;
        this.position = position;
        this.cardItems = [];
        this.files = [];
        this.cover = cover;
    }

}

export class CardDeleteResult {
    affected: number;
    raw: string[];

    constructor(affected: number, raw: string[]) {
        this.affected = affected
        this.raw = raw;
    }
}

