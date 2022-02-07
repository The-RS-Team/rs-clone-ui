import {ColumnInterface} from '../interfaces/column.interface';
import {Card} from './card';
import {CardInterface} from '../interfaces/card.interface';
import {BoardInterface} from "../interfaces/board.interface";

export class Column implements ColumnInterface {
    id: string;
    title: string;
    cards: CardInterface[];
    description: string;
    boardId: string;
    board: string;
    position: number;

    constructor(id: string, title: string, cards: Card[], description: string, boardId: string, position: number, board: string,) {
        this.id = id;
        this.title = title;
        this.cards = cards;
        this.description = description;
        this.boardId = boardId;
        this.board = board;
        this.position = position;
    }
}
