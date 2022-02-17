import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BoardsRoutingModule} from "./boards-routing.module";
import { ActionsComponent } from './components/board-header/actions/actions.component';


@NgModule({
    imports: [
        SharedModule,
        BoardsRoutingModule
    ],
    exports: [
    ],
    declarations: [
  ]
})
export class BoardsModule {
}
