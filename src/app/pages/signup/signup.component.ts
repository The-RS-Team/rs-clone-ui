import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from '../../auth/auth.service';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(public authService: AuthService,
                private fb: FormBuilder,
                private snackService: MatSnackBar,
                private route: ActivatedRoute) {

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

    gitHubAuth(): void {
        this.authService.gitHubAuth();
    }

    googleAuth(): void {
        this.authService.googleAuth();
    }

    emailAuth() {
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
        const actionModel = this.loginForm.getRawValue();
        console.log(actionModel)
    }

    logout(): void {
        this.authService.logout();
    }
}
