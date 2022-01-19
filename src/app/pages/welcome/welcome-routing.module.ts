import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
<<<<<<< HEAD
import {WelcomeComponent} from './welcome/welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SharedModule} from '../../shared/shared.module';
=======
import {WelcomeComponent} from "./welcome/welcome.component";
import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "../../shared/shared.module";

>>>>>>> development

export const ROUTES: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'sign-up', component: SignUpComponent},
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
