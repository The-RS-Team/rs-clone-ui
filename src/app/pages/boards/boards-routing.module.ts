import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppRoutes} from "../../app.constants";
import {BoardsComponent} from "./boards.component";
import {BoardContentComponent} from "./boards/board-content/board-content.component";
import {SharedModule} from "../../shared/shared.module";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {NewBoardComponent} from "./boards/new-board/new-board.component";
import {BoardCardComponent} from "./boards/board-card/board-card.component";
import {BoardListComponent} from "./boards/board-list/board-list.component";
import {DragDropModule} from "@angular/cdk/drag-drop";

export const ROUTES: Routes = [
    {path: '', component: BoardsComponent},
    {path: AppRoutes.boardContent, component: BoardContentComponent},
];

@NgModule({
    declarations: [BoardsComponent, BoardContentComponent, HeaderComponent, NewBoardComponent, BoardListComponent, BoardCardComponent],
    exports: [BoardsComponent, BoardContentComponent, HeaderComponent, NewBoardComponent, BoardListComponent, BoardCardComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES),
        DragDropModule,
    ]
})
export class BoardsRoutingModule {
}
