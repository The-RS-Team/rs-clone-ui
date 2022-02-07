import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AppRoutes} from '../app.constants';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router,
                private readonly firebaseAuth: AngularFireAuth,
                private readonly authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.firebaseAuth.authState.pipe(
            map(() => {
                if (this.authService.currentUser == undefined) {
                    this.router.navigate([AppRoutes.home]);
                }
                return this.authService.currentUser !== undefined;
            })
        );
    }


}
