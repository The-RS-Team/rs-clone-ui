import {CardInterface} from "./card.interface";

export interface ListInterface {
    id: number;
    title: string;
    cards: CardInterface[];
    boardId: number;
}
