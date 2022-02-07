import {CardInterface} from './card.interface';

export interface ColumnInterface {
    id?: string;
    title: string;
    cards: CardInterface[];
    position: number;
    boardId: string;
    board: string;
}
