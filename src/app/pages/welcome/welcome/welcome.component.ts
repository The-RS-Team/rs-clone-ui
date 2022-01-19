import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

    email = new FormControl();
    public svgColor: string = '#0076bc';
    header: HTMLElement | undefined;
    isScrolled = false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    @ViewChild('headerTop') headerTop: ElementRef | undefined;

    ngAfterViewInit(): void {
        this.header = this.headerTop?.nativeElement;
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (this.header) {
            window.scrollY > this.header.clientHeight
                ? this.isScrolled = true
                : this.isScrolled = false
        }
    };

    addQueryParameter() {
        this.router.navigate(['sign-up'], {queryParams: {email: this.email.value}})
    }
}
