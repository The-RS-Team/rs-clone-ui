import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public readonly authService: AuthService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authService.accessToken) {
            request = request.clone({
                headers: request.headers
                    .set('Authorization', `Bearer ${this.authService.accessToken}`)
                    .set('Content-Type', 'application/json')
            });
        }
        return next.handle(request);
    }
}
