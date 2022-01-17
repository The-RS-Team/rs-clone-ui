import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Injectable, OnInit} from '@angular/core';
import {first, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from '../shared/message.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit {
    public user: Observable<firebase.User | null>;
    private successRoute: string = '/boards';
    private logoutRoute: string = '/';

    public isLogged: boolean;

    constructor(private firebaseAuth: AngularFireAuth,
                private router: Router,
                private messageService: MessageService) {
        this.user = this.firebaseAuth.authState;
        this.isLogged = false;
    }

    ngOnInit(): void {

    }

    isLoggedIn() {
        return this.firebaseAuth.authState.pipe(first())
    }

    googleAuth() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    gitHubAuth(): void {
        this.firebaseAuth
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(
                value => {
                    this.router.navigate([this.successRoute]);
                }
            ).catch(
            err => {
                this.handleError('gitHubAuth', err.message);
                this.router.navigate([this.logoutRoute]);
            }
        );
    }

    emailAuth(email: string, password: string) {
        this.firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(
                value => {
                    this.router.navigate([this.successRoute]);
                }
            )
            .catch(err => {
                this.handleError('createUserWithEmailAndPassword', err.message);
                this.router.navigate([this.logoutRoute]);
            });
    }

    emailLogin(email: string, password: string) {
        this.firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                this.router.navigate([this.successRoute]);
            })
            .catch(err => {
                this.handleError('signInWithEmailAndPassword', err.message);
                this.router.navigate([this.logoutRoute]);
            });
    }

    logout() {
        this.firebaseAuth.signOut();
        this.router.navigate([this.logoutRoute]);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error);
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add(message);
    }
}
