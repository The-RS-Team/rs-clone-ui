import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../shared/message.service';
import {environment} from '../../../environments/environment';
import {BoardInterface} from '../../interfaces/board.interface';

@Injectable({
    providedIn: 'root'
})

export class BoardsService {
    private boardsUrl = environment.serverAPI + '/board';
    private fileUrl = environment.serverAPI + '/file'
    public unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${environment.unsplashKey}&page=1&query=nature&per_page=25&orientation=landscape`;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private readonly http: HttpClient,
                private readonly messageService: MessageService,
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

    getBoardById(id: number): Observable<BoardInterface> {
        const url = `${this.boardsUrl}/id/${id}`;

        return this.http
            .get<BoardInterface>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`get board id=${id}`)),
                catchError(this.handleError<BoardInterface>('getBoardById'))
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

    // uploadFile(file: File): Observable<File> {
    //     const formData = new FormData();
    //     formData.append("bg", file);
    //
    //     const httpHeaders = new HttpHeaders();
    //     return this.http
    //         .post<File>(this.fileUrl + '/upload', formData, {headers: httpHeaders})
    //         .pipe(
    //             tap(newFile => this.messageService.add(`upload file w/ id=${newFile}`)),
    //             catchError(this.handleError<File>('uploadFile'))
    //         );
    // }

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
