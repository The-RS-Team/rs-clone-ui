import {CardInterface} from "../interfaces/card.interface";

export class Card implements CardInterface {
    title: string;
    position: number;
    column: number;

    constructor(title: string, columnId: number, position: number) {
        this.title = title;
        this.column = columnId;
        this.position = position;
    }


}
