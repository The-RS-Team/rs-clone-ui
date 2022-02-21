import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { WebsocketService } from './shared/services/socket.service';
import { Messages } from 'src/app/app.constants';

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
        private socketService: WebsocketService
        
        ){
            translate.addLangs(['en', 'ua']);
            translate.setDefaultLang('en');
        }
        
        ngOnInit(): void {
            if (this.storage.getItem('user')) {
                // this.socketService.on(Messages.connect, ( _:any) => console.log('yepee'))
                this.authService.currentUser = this.storage.getItem('user');
        }
            if (this.storage.getItem('token')) {
                // this.socketService.on(Messages.connect, ( _:any) => console.log('yepee'))
                this.authService.accessToken = this.storage.getItem('token');
        }
    }
}
