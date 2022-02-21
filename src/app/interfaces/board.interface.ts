import {ColumnInterface} from './column.interface';
import { UsersToBoardsInterface } from './usersToBoards.interface';

export interface BoardInterface {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    background: string;
    columns?: ColumnInterface[];
    usersToBoards?: UsersToBoardsInterface[];
}
