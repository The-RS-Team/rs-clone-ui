import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Injectable} from '@angular/core';
import {first, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from '../shared/message.service';
import {AppRoutes} from '../app.constants';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public firebaseUser: Observable<firebase.User | null>;
    public currentUser: User | undefined;
    public accessToken: string = '';
    private successRoute: Array<string> = ['/', AppRoutes.boards];
    private logoutRoute: Array<string> = ['/'];

    constructor(private readonly firebaseAuth: AngularFireAuth,
                private readonly router: Router,
                private readonly messageService: MessageService,
                private readonly storageService: LocalStorageService,
                private readonly http: HttpClient,) {
        this.firebaseUser = this.firebaseAuth.authState;

        this.firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    user.getIdToken().then(idToken => {
                        this.currentUser = new User(user.uid, user.email, user.displayName, user.photoURL);
                        console.log('onAuthStateChanged: sendToken');
                        this.accessToken = idToken;
                    });
                }
            }
        )
    }

    isLoggedIn() {
        return this.firebaseAuth.authState.pipe(first())
    }

    googleAuth() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(
                value => {
                    this.router.navigate([AppRoutes.boards]);
                }
            );
    }

    gitHubAuth(): void {
        this.firebaseAuth
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(
                value => {
                    this.router.navigate(this.successRoute);
                }
            ).catch(
            err => {
                this.handleError('gitHubAuth', err.message);
                this.router.navigate(this.logoutRoute);
            }
        );
    }

    emailAuth(email: string, password: string) {
        this.firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(
                value => {
                    this.router.navigate(this.successRoute);
                }
            )
            .catch(err => {
                this.handleError('createUserWithEmailAndPassword', err.message);
                this.router.navigate(this.logoutRoute);
            });
    }

    emailLogin(email: string, password: string) {
        this.firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                this.router.navigate(this.successRoute);
            })
            .catch(err => {
                this.handleError('signInWithEmailAndPassword', err.message);
                this.router.navigate(this.logoutRoute);
            });
    }

    logout() {
        this.firebaseAuth.signOut();
        this.router.navigate(this.logoutRoute);
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
