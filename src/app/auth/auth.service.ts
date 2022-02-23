import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, first, Observable, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from '../shared/message.service';
import {AppRoutes} from '../app.constants';
import {User} from '../models/user';
import {LocalStorageService} from './../shared/services/local-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public currentUser: User | undefined;
    public accessToken: string = '';
    public readonly firebaseUser: Observable<firebase.User | null>;
    public readonly currentUserSubject = new BehaviorSubject(new User('', null, null, null));
    private readonly successRoute: Array<string> = ['/', AppRoutes.boards];
    private readonly logoutRoute: Array<string> = ['/'];

    constructor(private readonly firebaseAuth: AngularFireAuth,
                private readonly router: Router,
                private readonly messageService: MessageService,
                private readonly http: HttpClient,
                private readonly storage: LocalStorageService,
                private readonly translate: TranslateService) {
        this.firebaseUser = this.firebaseAuth.authState;

        this.firebaseAuth.onAuthStateChanged(user => {
                if (user) {
                    user.getIdToken().then(idToken => {
                        this.currentUser = new User(user.uid, user.email, user.displayName, user.photoURL);
                        this.currentUserSubject.next(this.currentUser)
                        this.accessToken = idToken;
                        this.login(this.currentUser).subscribe(value => {
                        });

                        if (!this.currentUser.picture) {
                            this.currentUser.picture = '../../../../assets/images/avatar.jpg';
                        }
                        if (!this.currentUser.name && this.currentUser.email) {
                            this.currentUser.name = this.sliceEmail(this.currentUser.email);
                        }
                        if (!this.currentUser.nickname && this.currentUser.email) {
                            this.currentUser.nickname = this.sliceEmail(this.currentUser.email);
                        }
                        if (!this.storage.getItem('token')) {
                            this.storage.setItem('token', this.accessToken);
                        }
                        if (!this.storage.getItem('user')) {
                            this.storage.setItem('user', this.currentUser);
                        }
                        if (this.currentUser && window.location.pathname == '/') {
                            this.router.navigate(this.successRoute)
                        }

                    });
                }
            }
        )
    }

    public login(user: User): Observable<any> {
        const loginUrl = environment.serverAPI + '/auth/login';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http
            .post<User>(loginUrl, user, httpOptions)
            .pipe(
                tap(_ => this.log(`login`)),
                catchError(this.handleError<User>('login'))
            );
    }

    sliceEmail(str: string) {
        const indx = str.indexOf('@');
        return str.slice(0, indx);
    }

    isLoggedIn() {
        return this.firebaseAuth.authState.pipe(first())
    }

    googleAuth() {
        this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(value => {
                    this.router.navigate([AppRoutes.boards]);
                }
            );
    }

    gitHubAuth(): void {
        this.firebaseAuth
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(value => {
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
                    this.router.navigate([AppRoutes.settings]);
                }
            )
            .catch(err => {
                this.handleError('createUserWithEmailAndPassword', err.message);
                if (err.message.indexOf('email-already-in-use')) {
                    alert(this.translate.instant('email-already-in-use'))
                }
                // alert(err.message)
                // this.router.navigate(this.logoutRoute);
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
