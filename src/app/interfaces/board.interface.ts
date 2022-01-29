import {ColumnInterface} from './column.interface';

export interface BoardInterface {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    background: string;
    columns: ColumnInterface[];
}
