import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewBoardComponent} from './new-board.component';

@NgModule({
    declarations: [NewBoardComponent],
    exports: [NewBoardComponent],
    imports: [
        CommonModule
    ]
})
export class NewBoardsModule {
}
