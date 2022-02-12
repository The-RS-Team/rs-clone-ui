import {CardItemInterface} from "./card-item.interface";

export interface CardInterface {
    id?: string;
    title: string;
    description: string;
    position: number;
    columnId: string;
    cardItems: CardItemInterface[];
}

