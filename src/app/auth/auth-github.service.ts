import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthConfig} from '../modules/auth.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthGithubService {

    private authConfig: AuthConfig = {
        url: 'https://github.com/login/oauth/authorize?client_id=',
        redirectUri: 'http://localhost:4200/callback',
        clientId: 'd4ed61174889135633f6'
    };

    constructor(private http: HttpClient) {
    }

    login() {
        this.http.get(`${this.authConfig.url}${this.authConfig.clientId}&redirect_uri=${this.authConfig.redirectUri}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
                'X-OAuth-Scopes': 'repo, user',
                'X-Accepted-OAuth-Scopes': 'user',
            },
        }).subscribe();
    }

    logout() {
    }

}
