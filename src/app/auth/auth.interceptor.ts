import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authService: AuthService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        try {
            const host = new URL(request.url);
            const server = new URL(environment.serverAPI)
            if (host.hostname == server.hostname && this.authService.accessToken) {
                request = request.clone({
                    headers: request.headers
                        .set('Authorization', `Bearer ${this.authService.accessToken}`)
                        .set('Content-Type', 'application/json')
                });
            }
        } finally {
            return next.handle(request);
        }
    }
}
