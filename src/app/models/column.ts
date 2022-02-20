import {ColumnInterface} from '../interfaces/column.interface';
import {Card} from './card';
import {CardInterface} from '../interfaces/card.interface';

export class Column implements ColumnInterface {
    id?: string;
    title: string;
    cards: CardInterface[];
    boardId: string;
    position: number;
    description: string;

    constructor(id: string, title: string, cards: Card[], boardId: string, position: number, description: string) {
        this.id = id;
        this.title = title;
        this.cards = cards;
        this.boardId = boardId;
        this.position = position;
        this.description = description;
    }
}

export class ColumnDeleteResult {
    affected: number;
    raw: string[];

    constructor(affected: number, raw: string[]) {
        this.affected = affected
        this.raw = raw;
    }
}
