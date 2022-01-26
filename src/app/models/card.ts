import {CardInterface} from "../interfaces/card.interface";

export class Card implements CardInterface {
    id: number;
    title: string;
    description: string;
    columnId: number;
    position: number;

    constructor(id: number, title: string, description: string, columnId: number, position: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columnId = columnId;
        this.position = position;
    }


}
