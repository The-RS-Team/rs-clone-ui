import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../shared/message.service';
import {environment} from '../../../environments/environment';
import {Board} from '../../interfaces/board.interface';

@Injectable({
    providedIn: 'root'
})

export class BoardsService {
    private boardsUrl = environment.serverAPI + '/board';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient,
                private readonly messageService: MessageService) {
    }

    getBoards(): Observable<Board[]> {
        return this.http
            .get<Board[]>(this.boardsUrl + '/all', this.httpOptions)
            .pipe(
                tap(_ => this.messageService.add('fetched Boards')),
                catchError(this.handleError<Board[]>('getBoards', []))
            );
    }

    addBoard(board: Board): Observable<Board> {
        return this.http
            .post<Board>(this.boardsUrl, board, this.httpOptions)
            .pipe(
                tap((newBoard: Board) => this.log(`added board w/ id=${newBoard.id}`)),
                catchError(this.handleError<Board>('addBoard'))
            );
    }

    deleteBoard(id: number): Observable<Board> {
        const url = `${this.boardsUrl}/${id}`;

        return this.http
            .delete<Board>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted board id=${id}`)),
                catchError(this.handleError<Board>('deleteBoard'))
            );
    }

    getFavorites(): Observable<Board[]> {
        return this.http
            .get<Board[]>(this.boardsUrl + '/fav', this.httpOptions)
            .pipe(
                tap(_ => this.messageService.add('fetched Boards')),
                catchError(this.handleError<Board[]>('getBoards', []))
            );
    }

    updateBoard(board: Board): Observable<any> {
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
