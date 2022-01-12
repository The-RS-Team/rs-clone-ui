import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGithubService} from './auth/auth-github.service';
import {HeaderComponent} from './pages/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {SignupComponent} from './pages/signup/signup.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GlobalCoreService} from "./shared/global-core.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SignupComponent,
        WelcomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        MatInputModule,
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
