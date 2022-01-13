import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalCoreService} from '../../shared/global-core.service';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

    email = new FormControl();
    public svgColor: string = '#0076bc';

    constructor(private globalCoreService: GlobalCoreService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const element = document.querySelector('.header__top') as HTMLElement;
        if (window.scrollY > element.clientHeight) {
            element.classList.add('header__top_inverse');
        } else {
            element.classList.remove('header__top_inverse');
        }
    };

    addQueryParameter() {
        this.router.navigate(['signup'], {queryParams: {email: this.email.value}})
    }
}
