import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BoardsRoutingModule} from "./boards-routing.module";

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
