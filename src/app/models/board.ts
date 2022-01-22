import {ListInterface} from "../interfaces/list.interface";
import {BoardInterface} from "../interfaces/board.interface";

export class Board implements BoardInterface {
    background: string;
    id: number;
    isFavorite: boolean;
    lists: ListInterface[];
    title: string;

    constructor(id: number, title: string, isFavorite: boolean, lists: ListInterface[], background: string) {
        this.background = background;
        this.title = title;
        this.isFavorite = isFavorite;
        this.background = background;
        this.lists = lists;
        this.id = id;
    }


}
