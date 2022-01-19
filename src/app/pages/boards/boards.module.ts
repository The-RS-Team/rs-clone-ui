import {NgModule} from '@angular/core';
import {BoardsComponent} from './boards.component';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {SharedModule} from '../../shared/shared.module';
import {NewBoardComponent} from './new-board/new-board.component';

@NgModule({
    declarations: [
        BoardsComponent,
        HeaderComponent,
        NewBoardComponent,
    ],
    exports: [
        BoardsComponent,
        HeaderComponent,
    ],
    imports: [
        SharedModule
    ]
})
export class BoardsModule {
}
