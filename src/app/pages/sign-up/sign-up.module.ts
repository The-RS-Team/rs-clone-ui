import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignUpComponent} from "./sign-up.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [SignUpComponent],
    exports: [SignUpComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})

export class SignUpModule {
}
