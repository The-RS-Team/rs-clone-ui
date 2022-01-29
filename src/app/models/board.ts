import {ColumnInterface} from '../interfaces/column.interface';
import {BoardInterface} from '../interfaces/board.interface';

export class Board implements BoardInterface {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    background: string;
    columns: ColumnInterface[];

    constructor(id: string, title: string, description: string, isFavorite: boolean, background: string, columns: ColumnInterface[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isFavorite = isFavorite;
        this.background = background;
        this.columns = columns;
    }


}
