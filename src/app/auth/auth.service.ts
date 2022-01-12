import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public user: Observable<firebase.User | null>;

    constructor(private firebaseAuth: AngularFireAuth) {
        this.user = firebaseAuth.authState;
    }

    googleAuth(){
        this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    gitHubAuth(): void {
        this.firebaseAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }

    emailAuth(email: string, password: string) {
        this.firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Success!', value);
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    emailLogin(email: string, password: string) {
        this.firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Nice, it worked!');
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    logout() {
        this.firebaseAuth.signOut();
    }
}
