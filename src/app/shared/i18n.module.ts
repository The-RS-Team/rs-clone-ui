import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LocalStorageService} from './services/local-storage.service';
import { AuthService } from '../auth/auth.service';

@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [TranslateModule]
})
export class I18nModule {
    constructor(private readonly translate: TranslateService,
                private readonly storage: LocalStorageService,
                private authService: AuthService) {
        translate.addLangs(['en', 'ua']);
        // const browserLang = translate.getBrowserLang();
        // const browserLang = this.storage.getItem('user')!.lang;
        const browserLang = this.storage.getItem('language')!
        if (browserLang) translate.use(browserLang.match(/en|ua/) ? browserLang : 'en');
    }
}

export function translateLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}
