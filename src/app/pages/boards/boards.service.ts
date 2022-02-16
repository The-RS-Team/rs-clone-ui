import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../shared/message.service';
import {environment} from '../../../environments/environment';
import {BoardInterface} from '../../interfaces/board.interface';
import {UserInterface} from "../../interfaces/user.interface";
import {Messages} from "../../app.constants";
import {WebsocketService} from "../../shared/services/socket.service";

@Injectable({
    providedIn: 'root'
})

export class BoardsService {
    private boardsUrl = environment.serverAPI + '/board';
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

    getAllFiles(cardId: string): Observable<File[]> {
        return this.http
            .get<File[]>(this.filesUrl + '/all/' + cardId, this.httpOptions)
            .pipe(
                tap(_ => this.messageService.add('fetched Boards')),
                catchError(this.handleError<File[]>('getBoards', []))
            );
    }

    deleteFile(id: string): Observable<any> {
        const url = `${this.filesUrl}/${id}`;

        return this.http
            .delete<any>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted file id=${id}`)),
                catchError(this.handleError<any>('deleteFile'))
            );
    }

    getFileById(id: string): Observable<any> {
        const url = `${this.filesUrl}/id/${id}`;
        const httpHeaders = new HttpHeaders();

        return this.http
            //@ts-ignore
            .get<any>(url, {headers: httpHeaders, responseType: 'blob'})
            .pipe(
                tap(_ => this.log(`get file id=${id}`)),
                catchError(this.handleError<any>('getFileById'))
            );
    }

    postFile(fileToUpload: File, cardId: string):void {
        console.log(fileToUpload, 'fileToUpload')
        this.socketService.emit(Messages.newFile, fileToUpload);
        // const formData: FormData = new FormData();
        // formData.append('file', fileToUpload);
        // const httpHeaders = new HttpHeaders();
        // return this.http
        //     .post<any>(`${this.filesUrl}/upload/${cardId}`, formData, {headers: httpHeaders})
        //     .pipe(
        //         tap((newFile: any) => this.log(`added file w/ id=${newFile}`)),
        //         catchError(this.handleError<File>('addFile'))
        //     );
    }
}
