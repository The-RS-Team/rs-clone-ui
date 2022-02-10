import {CardInterface} from '../interfaces/card.interface';
import {CardItemInterface} from "../interfaces/card-item.interface";

export class Card implements CardInterface {
    id?: string;
    title: string;
    description: string;
    columnId: string;
    column: string;
    position: number;
    cardItems: CardItemInterface[];

    constructor(id: string, title: string, description: string, columnId: string, position: number, column: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columnId = columnId;
        this.column = column;
        this.position = position;
        this.cardItems = [];
    }


}
