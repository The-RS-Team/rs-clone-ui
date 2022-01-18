import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from "./welcome.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [WelcomeComponent],
    exports: [WelcomeComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})

export class WelcomeModule {
}
