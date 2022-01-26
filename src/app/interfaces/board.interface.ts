import {ColumnInterface} from "./column.interface";

export interface BoardInterface {
    id: number;
    title: string;
    isFavorite: boolean;
    background: string;
    columns: ColumnInterface[];
}
