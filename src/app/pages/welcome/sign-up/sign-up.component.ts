import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


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

    constructor(public authService: AuthService,
                private fb: FormBuilder,
                private snackService: MatSnackBar,
                private route: ActivatedRoute,
                private router: Router) {

        this.loginForm = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.email, Validators.required]]
        })

    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
                this.loginForm.controls['email'].setValue(params['email']);
            }
        )
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
        this.authService.emailAuth(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
        this.goToRegister();
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
}
