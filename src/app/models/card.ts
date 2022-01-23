import {CardInterface} from "../interfaces/card.interface";

export class Card implements CardInterface {
    description: string;
    title: string;
    listId: number;
    id: number;

    constructor(description: string, title: string, listId: number, id: number) {
        this.description = description;
        this.title = title;
        this.listId = listId;
        this.id = id;
    }


}
