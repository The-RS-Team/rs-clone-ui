import {NgModule} from '@angular/core';
import {BoardsComponent} from './boards.component';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {NewBoardComponent} from './new-board/new-board.component';
import {SharedModule} from '../../shared/shared.module';
import {BoardsRoutingModule} from "./boards-routing.module";

@NgModule({
    declarations: [
        BoardsComponent,
        HeaderComponent,
        NewBoardComponent,
    ],
    exports: [
        BoardsComponent,
        HeaderComponent,
        NewBoardComponent,
    ],
    imports: [
        SharedModule
    ]
})
export class BoardsModule {
}
