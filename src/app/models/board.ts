import {ColumnInterface} from "../interfaces/column.interface";
import {BoardInterface} from "../interfaces/board.interface";

export class Board implements BoardInterface {
    id: number;
    title: string;
    isFavorite: boolean;
    background: string;
    columns: ColumnInterface[];

    constructor(id: number, title: string, isFavorite: boolean, background: string, columns: ColumnInterface[]) {
        this.id = id;
        this.title = title;
        this.isFavorite = isFavorite;
        this.background = background;
        this.columns = columns;
    }


}
