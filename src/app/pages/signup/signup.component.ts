import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(public authService: AuthService) {
        this.email = this.password = '';
    }

    ngOnInit(): void {

    }

    gitHubAuth(): void {
        this.authService.gitHubAuth();
    }

    googleAuth(): void {
        this.authService.googleAuth();
    }

    emailAuth() {
        this.authService.emailAuth(this.email, this.password);
        this.email = this.password = '';
    }

    login() {
        this.authService.emailLogin(this.email, this.password);
        this.email = this.password = '';
    }

    logout(): void {
        this.authService.logout();
    }

}
