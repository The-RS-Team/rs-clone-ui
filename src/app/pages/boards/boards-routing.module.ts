import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppRoutes} from "../../app.constants";
import {BoardsComponent} from "./boards/boards.component";
import {BoardContentComponent} from "./board-content/board-content.component";
import {SharedModule} from "../../shared/shared.module";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {NewBoardComponent} from "./new-board/new-board.component";

export const ROUTES: Routes = [
    {path: '', component: BoardsComponent},
    {path: AppRoutes.boardContent, component: BoardContentComponent},
];

@NgModule({
    declarations: [BoardsComponent, BoardContentComponent, HeaderComponent, NewBoardComponent],
    exports: [BoardsComponent, BoardContentComponent, HeaderComponent, NewBoardComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class BoardsRoutingModule {
}
