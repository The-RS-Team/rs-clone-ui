import {ColumnInterface} from '../interfaces/column.interface';
import {Card} from './card';
import {CardInterface} from '../interfaces/card.interface';

export class Column implements ColumnInterface {
    id: string;
    title: string;
    cards: CardInterface[];
    boardId: string;
    position: number;

    constructor(id: string, cards: Card[], title: string, boardId: string, position: number) {
        this.id = id;
        this.title = title;
        this.cards = cards;
        this.boardId = boardId;
        this.position = position;
    }
}
