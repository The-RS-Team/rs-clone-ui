import {ColumnInterface} from "../interfaces/column.interface";
import {Card} from "./card";
import {CardInterface} from "../interfaces/card.interface";

export class Column implements ColumnInterface {
    id: number;
    title: string;
    cards: CardInterface[];
    board: number;
    position: number;
    description: string;

    constructor(id: number, cards: Card[], title: string, board: number, position: number, description:string) {
        this.id = id;
        this.title = title;
        this.cards = cards;
        this.board = board;
        this.position = position;
        this.description = description;
    }
}
