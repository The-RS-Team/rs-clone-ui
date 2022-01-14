import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './pages/signup/signup.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {BoardsComponent} from "./pages/boards/boards.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'signup', component: SignupComponent},
    {path: 'boards', component: BoardsComponent},
    {path: 'home', component: WelcomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
