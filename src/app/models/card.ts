import {CardInterface} from '../interfaces/card.interface';
import {CardItemInterface} from "../interfaces/card-item.interface";

export class Card implements CardInterface {
    id?: string;
    title: string;
    description: string;
    columnId: string;
    position: number;
    cardItems: CardItemInterface[];

    constructor(id: string, title: string, description: string, columnId: string, position: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columnId = columnId;
        this.position = position;
        this.cardItems = [];
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

