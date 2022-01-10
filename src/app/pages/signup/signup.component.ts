import {Component, OnInit} from '@angular/core';
import {AuthGithubService} from '../../auth/auth-github.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

    constructor(private authGithubService: AuthGithubService) {
    }

    ngOnInit(): void {
    }

    login(): void {
        this.authGithubService.login();
    }

}
