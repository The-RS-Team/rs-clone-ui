import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from '../../shared/shared.module';

export const ROUTES: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: SignUpComponent},
];

@NgModule({
    declarations: [WelcomeComponent, SignUpComponent],
    exports: [WelcomeComponent, SignUpComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class WelcomeRoutingModule {
}
