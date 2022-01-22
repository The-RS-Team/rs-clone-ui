import {CardInterface} from "../interfaces/card.interface";

export class Card implements CardInterface {
    description: string;
    listId: number;
    id: number;

    constructor(description: string, listId: number, id: number) {
        this.description = description;
        this.listId = listId;
        this.id = id;
    }


}
