import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {SignupComponent} from './pages/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BoardsComponent} from './pages/boards/boards.component';
import {GlobalCoreService} from './shared/global-core.service';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from "./auth/auth.service";
import { MatDialogModule } from '@angular/material/dialog';
import { NewBoardComponent } from './pages/new-board/new-board.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SignupComponent,
        WelcomeComponent,
        BoardsComponent,
        NewBoardComponent,
    ],
    imports: [
    BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    providers: [
        AuthService,
        GlobalCoreService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [NewBoardComponent]
})
export class AppModule {
}
