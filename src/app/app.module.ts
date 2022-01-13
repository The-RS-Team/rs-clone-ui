import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './auth/auth.service';
import {HeaderComponent} from './pages/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {SignupComponent} from './pages/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GlobalCoreService} from './shared/global-core.service';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {MatSnackBarModule} from '@angular/material/snack-bar';


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
        MatSnackBarModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [
        AuthService,
        GlobalCoreService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
