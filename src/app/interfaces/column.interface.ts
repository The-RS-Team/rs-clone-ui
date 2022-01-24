import {CardInterface} from "./card.interface";

export interface ColumnInterface {
    id: number;
    title: string;
    cards: CardInterface[];
    position: number;
    boardId: number;
}
