import {ListInterface} from "./list.interface";

export interface BoardInterface {
    id: number;
    title: string;
    isFavorite: boolean;
    lists: ListInterface[];
    background: string;
}
