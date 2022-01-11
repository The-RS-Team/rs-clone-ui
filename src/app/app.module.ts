import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGithubService} from './auth/auth-github.service';
import {HeaderComponent} from './pages/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {SignupComponent} from './pages/signup/signup.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GlobalCoreService} from "./shared/global-core.service";
import { BoardsComponent } from './pages/boards/boards.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SignupComponent,
        WelcomeComponent,
        BoardsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
    ],
    providers: [
        AuthGithubService,
        GlobalCoreService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
