import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardsComponent} from './pages/boards/components/boards/boards.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'login', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
    {path: 'home', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
    {path: 'models-content', loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule)},
    {path: 'boards', loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule), canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})

export class AppRoutingModule {

}
