import {CardInterface} from '../interfaces/card.interface';

export class Card implements CardInterface {
    id?: string;
    title: string;
    description: string;
    columnId: string;
    position: number;

    constructor(id: string, title: string, description: string, columnId: string, position: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columnId = columnId;
        this.position = position;
    }


}
