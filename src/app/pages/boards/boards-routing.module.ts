import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppRoutes} from "../../app.constants";
import {BoardsComponent} from "./components/boards/boards.component";
import {BoardComponent} from "./components/board/board.component";
import {SharedModule} from "../../shared/shared.module";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {NewBoardComponent} from "./components/new-board/new-board.component";
import {CardComponent} from "./components/card/card.component";
import {ColumnComponent} from "./components/column/column.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CardPopUpInfoComponent} from "./components/card-pop-up-info/card-pop-up-info.component";
import {BoardHeaderComponent} from "./components/board-header/board-header.component";
import {BackgroundComponent} from "./components/board-header/background/background.component";

export const ROUTES: Routes = [
    {path: '', component: BoardsComponent},
    {path: AppRoutes.board, component: BoardComponent},
];

@NgModule({
    declarations: [BoardsComponent,
        BoardComponent,
        HeaderComponent,
        BoardHeaderComponent,
        NewBoardComponent,
        ColumnComponent,
        CardComponent,
        CardPopUpInfoComponent,
        BackgroundComponent
    ],
    exports: [BoardsComponent,
        BoardComponent,
        HeaderComponent,
        BoardHeaderComponent,
        NewBoardComponent,
        ColumnComponent,
        CardComponent,
        CardPopUpInfoComponent,
        BackgroundComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES),
        DragDropModule
    ]
})
export class BoardsRoutingModule {
}
