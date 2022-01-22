import {ListInterface} from "../interfaces/list.interface";
import {Card} from "./card";
import {CardInterface} from "../interfaces/card.interface";

export class List implements ListInterface {
    boardId: number;
    cards: CardInterface[];
    id: number;
    title: string;

    constructor(id: number, cards: Card[], title: string, boardId: number) {
        this.cards = cards;
        this.title = title;
        this.id = id;
        this.boardId = boardId;
    }


}
