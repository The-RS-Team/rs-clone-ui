import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    public passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(public authService: AuthService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
                this.emailFormControl.setValue(params['email']);
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
        this.authService.emailAuth(this.emailFormControl.value, this.passwordFormControl.value);
    }

    login() {
        this.authService.emailLogin(this.emailFormControl.value, this.passwordFormControl.value);
    }

    logout(): void {
        this.authService.logout();
    }
}
