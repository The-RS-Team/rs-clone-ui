import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../shared/message.service';
import {environment} from '../../../environments/environment';
import {BoardInterface} from '../../interfaces/board.interface';
import {ColumnInterface} from "../../interfaces/column.interface";
import {CardInterface} from "../../interfaces/card.interface";

@Injectable({
    providedIn: 'root'
})

export class BoardsService {
    private boardsUrl = environment.serverAPI + '/board';

    // lists: ColumnInterface[] = [
    //     {id: 1, title: 'Column-1', boardId: 1},
    //     {id: 2, title: 'Column-2', boardId: 1},
    //     {id: 3, title: 'Column-3', boardId: 2},
    //     {id: 4, title: 'Column-4', boardId: 2},
    //     {id: 5, title: 'Column-5', boardId: 2},
    // ]

    // cards: CardInterface[] = [
    //     {id: 1, description: 'Task-1', listId: 1},
    //     {id: 2, description: 'Task-2', listId: 1},
    //     {id: 3, description: 'Task-3', listId: 2},
    //     {id: 4, description: 'Task-4', listId: 2},
    //     {id: 5, description: 'Task-5', listId: 2},
    // ]

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient,
                private readonly messageService: MessageService) {
    }

    getBoards(): Observable<BoardInterface[]> {
        return this.http
            .get<BoardInterface[]>(this.boardsUrl + '/all', this.httpOptions)
            .pipe(
                tap(_ => this.messageService.add('fetched Boards')),
                catchError(this.handleError<BoardInterface[]>('getBoards', []))
            );
    }

    addBoard(board: BoardInterface): Observable<BoardInterface> {
        return this.http
            .post<BoardInterface>(this.boardsUrl, board, this.httpOptions)
            .pipe(
                tap((newBoard: BoardInterface) => this.log(`added board w/ id=${newBoard.id}`)),
                catchError(this.handleError<BoardInterface>('addBoard'))
            );
    }

    getBoardById(id: number): Observable<BoardInterface> {
        const url = `${this.boardsUrl}/id/${id}`;

        return this.http
            .get<BoardInterface>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`get board id=${id}`)),
                catchError(this.handleError<BoardInterface>('getBoardById'))
            );
    }

    deleteBoard(id: number): Observable<BoardInterface> {
        const url = `${this.boardsUrl}/${id}`;

        return this.http
            .delete<BoardInterface>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted board id=${id}`)),
                catchError(this.handleError<BoardInterface>('deleteBoard'))
            );
    }

    getFavorites(): Observable<BoardInterface[]> {
        return this.http
            .get<BoardInterface[]>(this.boardsUrl + '/fav', this.httpOptions)
            .pipe(
                tap(_ => this.messageService.add('fetched Boards')),
                catchError(this.handleError<BoardInterface[]>('getBoards', []))
            );
    }

    updateBoard(board: BoardInterface): Observable<any> {
        return this.http
            .put(this.boardsUrl, board, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated board id=${board.id}`)),
                catchError(this.handleError<any>('updateBoard'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.messageService.add(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(`BoardService: ${message}`);
    }
}
