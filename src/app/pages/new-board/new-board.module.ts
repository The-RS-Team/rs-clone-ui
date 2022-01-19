import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewBoardComponent} from './new-board.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [NewBoardComponent],
    exports: [NewBoardComponent],
    imports: [
        CommonModule,
        MatDialogModule,
    ]
})
export class NewBoardsModule {
}
