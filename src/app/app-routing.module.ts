import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AppRoutes} from './app.constants';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: AppRoutes.login, loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
    {path: AppRoutes.home, loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
    {path: AppRoutes.board, loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule), canActivate: [AuthGuard]},
    {path: AppRoutes.boards, loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule), canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})

export class AppRoutingModule {

}
