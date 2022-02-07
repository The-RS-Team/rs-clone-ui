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
import {BoardsModule} from "./boards.module";
import {CardPopUpInfoComponent} from "./components/card-pop-up-info/card-pop-up-info.component";
import {AppModule} from "../../app.module";
import {SafePipe} from "./components/card-pop-up-info/safe.pipe";

export const ROUTES: Routes = [
    {path: '', component: BoardsComponent},
    {path: AppRoutes.board, component: BoardComponent},
];

@NgModule({
    declarations: [BoardsComponent,
        BoardComponent,
        HeaderComponent,
        NewBoardComponent,
        ColumnComponent,
        CardComponent,
        CardPopUpInfoComponent,
        SafePipe,
    ],
    exports: [BoardsComponent, BoardComponent, HeaderComponent, NewBoardComponent, ColumnComponent,
        CardComponent,
        CardPopUpInfoComponent,
        SafePipe,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES),
        DragDropModule,
    ]
})
export class BoardsRoutingModule {
}
