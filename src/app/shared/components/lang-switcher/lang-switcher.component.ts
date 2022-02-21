import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {TranslateService} from "@ngx-translate/core";
import { AuthService } from 'src/app/auth/auth.service';
import { BoardsService } from 'src/app/pages/boards/boards.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
  public currentLanguage: string | null = 'en';

  constructor(private readonly storage: LocalStorageService,
              public readonly translate: TranslateService,
              private authService: AuthService,
              private boardService: BoardsService) {
    this.currentLanguage = storage.getItem('language') ? storage.getItem('language') : '';
  }

  ngOnInit(): void {
  }

  changeLanguage(lan: string): void {
    this.storage.setItem('language', lan)
    this.translate.use(lan)
    if (this.authService.currentUser) {
      let user: User = {
        user_id:  this.authService.currentUser.user_id,
        email:  this.authService.currentUser.email,
        name:  this.authService.currentUser.name,
        picture:  this.authService.currentUser.picture,
        nickname: this.authService.currentUser.nickname,
        lang: lan
      }
      this.authService.currentUser.lang = lan;
      this.storage.setItem('user', user);
      this.boardService.updateUser(user).subscribe(_ => {})
    }

  }

  getLanguageName(lan: string): string {
    let label = '';
    switch (lan) {
      case 'ua':
        label = 'Українська';
        break;
      case 'en':
        label = 'English';
        break;
    }
    return label;
  }

}
