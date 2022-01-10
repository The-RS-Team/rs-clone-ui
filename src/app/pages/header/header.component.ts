import {Component, OnInit} from '@angular/core';
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

}
