import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalCoreService} from "../../shared/global-core.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    public svgColor: string = '#0076bc';

    constructor(private globalCoreService: GlobalCoreService) {

    }

    ngOnInit(): void {
    }
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        let element = document.querySelector('.header__top') as HTMLElement;
        if (window.scrollY > element.clientHeight) {
            element.classList.add('header__top_inverse');
        } else {
            element.classList.remove('header__top_inverse');
        }
    };



}
