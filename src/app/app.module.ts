import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AuthService} from "./auth/auth.service";
import {WelcomeModule} from "./pages/welcome/welcome.module";
import {BoardsModule} from "./pages/boards/boards.module";
import {Routes} from "@angular/router";
import {SharedModule} from "./shared/shared.module";

export const ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    // {path: 'sign-up', loadChildren: () => import('./pages/welcome/sign-up/sign-up.module').then(m => m.SignUpModule)},
    // {path: 'login', loadChildren: () => import('./pages/welcome/sign-up/sign-up.module').then(m => m.SignUpModule)},
    {path: 'boards', loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule)},
    {path: 'home', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)}
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        WelcomeModule,
        BoardsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
