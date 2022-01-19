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
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Max-Age': '1000',
            // 'Access-Control-Allow-Origin': 'http://localhost:3000/boards',
            // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding',
            // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        })
    };

    boards: Board[] = [
        {id: 1, title: 'Board-1', isFavorite: false, background: 'bg-1.jpg'},
        {id: 2, title: 'Board-2', isFavorite: false, background: 'bg-2.jpg'},
        {id: 3, title: 'Board-3', isFavorite: false, background: 'bg-3.jpg'},
        {id: 4, title: 'Board-4', isFavorite: false, background: 'bg-1.jpg'},
    ]
    favorites: Board[] = []

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

    getFavorites(): Observable<Board[]> {
        return this.http
            .get<Board[]>(this.boardsUrl + '/fav', this.httpOptions)
            .pipe(
                tap(_ => this.messageService.add('fetched Boards')),
                catchError(this.handleError<Board[]>('getBoards', []))
            );
    }

    addToFavorites(id: number): void {
        this.boards[id - 1].isFavorite = !this.boards[id - 1].isFavorite;
        this.getFavorites();
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
