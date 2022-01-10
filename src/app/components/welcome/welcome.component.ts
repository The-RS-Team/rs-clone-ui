import {Component, OnInit} from '@angular/core';
import {GlobalCoreService} from '../../share/global-core.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

    constructor(private globalCoreService: GlobalCoreService) {
    }

    ngOnInit(): void {
    }

}
