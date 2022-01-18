import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {BoardsComponent} from "./pages/boards/boards.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'login', component: SignUpComponent},
    {path: 'boards', component: BoardsComponent},
    {path: 'home', component: WelcomeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
