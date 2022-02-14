import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../shared/message.service';
import {environment} from '../../../environments/environment';
import {BoardInterface} from '../../interfaces/board.interface';
import {UserInterface} from "../../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
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
    ) {}

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
