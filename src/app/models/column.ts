import {ColumnInterface} from "../interfaces/column.interface";
import {Card} from "./card";
import {CardInterface} from "../interfaces/card.interface";

export class Column implements ColumnInterface {
    id: number;
    title: string;
    cards: CardInterface[];
    boardId: number;
    position: number;

    constructor(id: number, cards: Card[], title: string, boardId: number, position: number) {
        this.id = id;
        this.title = title;
        this.cards = cards;
        this.boardId = boardId;
        this.position = position;
    }
}
