import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'TrelloClone';

    constructor(
        public translate: TranslateService,
        private authService: AuthService,
        private storage: LocalStorageService,

    ){
        translate.addLangs(['en', 'ua']);
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
        if (this.storage.getItem('user')) {
            this.authService.currentUser = this.storage.getItem('user');
        }
    }
}
