import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../shared/message.service';
import {environment} from '../../../environments/environment';
import {BoardInterface} from '../../interfaces/board.interface';
import {UserInterface} from '../../interfaces/user.interface';
import {WebsocketService} from '../../shared/services/socket.service';
import {User} from '../../models/user';
import {Invite} from '../../models/invite';

@Injectable({
    providedIn: 'root'
})

export class BoardsService {
    private boardsUrl = environment.serverAPI + '/board';
    private inviteUrl = environment.serverAPI + '/invite';
    public unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${environment.unsplashKey}&page=1&query=nature&per_page=25&orientation=landscape`;
    private filesUrl = environment.serverAPI + '/file';
    private userUrl = environment.serverAPI + '/users';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient,
                private readonly messageService: MessageService,
                private readonly socketService: WebsocketService
    ) {
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

    getBoardById(id: string): Observable<BoardInterface> {
        const url = `${this.boardsUrl}/id/${id}`;

        return this.http
            .get<BoardInterface>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`get board id=${id}`)),
                catchError(this.handleError<BoardInterface>('getBoardById'))
            );
    }

    checkInvites(): Observable<Invite[]> {
        const url = `${this.inviteUrl}`;
        return this.http
            .get<Invite[]>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`checkInvitesByEmail`)),
                catchError(this.handleError<Invite[]>('checkInvitesByEmail'))
            );
    }

    deleteBoard(id: string): Observable<BoardInterface> {
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

    getUnsplashImg(): Observable<any> {
        return this.http
            .get(this.unsplashUrl)
            .pipe(
                tap(_ => this.log(`fetched unsplash images`)),
                catchError(this.handleError<any>('getUnsplashImg'))
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


    updateUser(user: User): Observable<any> {
        return this.http
            .put(this.userUrl, user, this.httpOptions)
            .pipe(
                tap(_ => this.log(`updated user id=${user.user_id}`)),
                catchError(this.handleError<any>('updateUser'))
            );
    }

    getUserById(id: string): Observable<UserInterface> {
        const url = `${this.userUrl}/id/${id}`;

        return this.http
            .get<UserInterface>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`get board id=${id}`)),
                catchError(this.handleError<UserInterface>('getUserdById'))
            );
    }

    getUsers(): Observable<any> {
        const url = `${this.userUrl}/all`;
        return this.http
            .get<UserInterface>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`get user`)),
                catchError(this.handleError<UserInterface>('getUsers'))
            );
    }
}
