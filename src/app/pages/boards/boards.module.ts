import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardsComponent} from './boards.component';
import {HeaderComponent} from '../../shared/components/header/header.component';

@NgModule({
    declarations: [BoardsComponent, HeaderComponent],
    exports: [BoardsComponent, HeaderComponent],
    imports: [
        CommonModule
    ]
})
export class BoardsModule {
}
