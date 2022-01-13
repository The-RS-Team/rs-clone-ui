import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {GlobalCoreService} from '../../shared/global-core.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

    public svgColor: string = '#0076bc';
    header: HTMLElement|undefined;
    isScrolled = false;

    constructor(private globalCoreService: GlobalCoreService) {
    }

    ngOnInit(): void {
    }

    @ViewChild('headerTop') headerTop: ElementRef|undefined;
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
}
