import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
    selector: 'app-auth-firebase',
    templateUrl: './auth-firebase.component.html',
    styleUrls: ['./auth-firebase.component.scss'],
})

export class AuthFirebaseComponent implements OnInit {

    constructor(public auth: AngularFireAuth) {

    }

    ngOnInit(): void {
    }

    login() {
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.signOut();
    }

}
