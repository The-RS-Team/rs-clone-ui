import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
    public loginForm: FormGroup;
    public signUpVisibility = false
    public currentRoute = this.route.snapshot.routeConfig?.path;
    public currentQueryParams = this.route.snapshot.queryParamMap.get('register');
    public currentLanguage: string = 'en';

    constructor(public readonly authService: AuthService,
                private readonly fb: FormBuilder,
                private readonly snackService: MatSnackBar,
                private readonly route: ActivatedRoute,
                private readonly router: Router,
                public readonly translate: TranslateService,
                private readonly storage: LocalStorageService) {

        this.loginForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })

        this.currentLanguage = storage.getItem('language') ? storage.getItem('language') : '';
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
                this.loginForm.controls['email'].setValue(params['email']);
            }
        )
    }

    showPassInput(): void {
        this.signUpVisibility = true;
    }

    goToAnotherForm(page: string) {
        this.router.navigate([page], {queryParams: {email: this.loginForm.controls['email'].value}})
    }


    goToRegister() {
        this.signUpVisibility = this.loginForm.controls['email'].valid;
    }

    gitHubAuth(): void {
        this.authService.gitHubAuth();
    }

    googleAuth(): void {
        this.authService.googleAuth();
    }

    emailAuth() {
        if (this.loginForm.invalid) return;
        this.authService.emailAuth(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    }

    login() {
        this.authService.emailLogin(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    }

    submitLoginForm() {
        if (this.loginForm.invalid) {
            this.snackService.open('Check input fields', 'Ok');
            return;
        }
    }

    logout(): void {
        this.authService.logout();
    }

    changeLanguage(lan: string) {
        this.storage.setItem('language', lan)
        this.translate.use(lan)
    }

    getLanguageName(lan: string) {
        let label = '';
        switch (lan) {
            case 'ua':
                label = 'Українська';
                break;
            case 'en':
                label = 'English';
                break;
        }
        return label;
    }
}
