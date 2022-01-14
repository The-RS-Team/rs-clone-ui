import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalCoreService} from "../../global-core.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    constructor(private globalCoreService: GlobalCoreService) {

    }

    ngOnInit(): void {
    }

}
