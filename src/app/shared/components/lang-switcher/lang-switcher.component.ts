import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
  public currentLanguage: string = 'en';

  constructor(private readonly storage: LocalStorageService,
              public readonly translate: TranslateService) {

    this.currentLanguage = storage.getItem('language') ? storage.getItem('language') : '';
  }

  ngOnInit(): void {
  }

  changeLanguage(lan: string) {
    this.storage.setItem('language', lan)
    this.translate.use(lan)
  }

  getLanguageName(lan: string) {
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
