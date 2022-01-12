import {Component, OnInit} from '@angular/core';
import {AuthGithubService} from '../../auth/auth-github.service';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

    public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(private authGithubService: AuthGithubService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.emailFormControl.setValue(params['email']);
            }
        )
    }

    login(): void {
        this.authGithubService.login();
    }
}
