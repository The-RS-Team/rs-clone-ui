import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BoardsRoutingModule} from "./boards-routing.module";
import { CardPopUpInfoComponent } from './components/card-pop-up-info/card-pop-up-info.component';

@NgModule({
    imports: [
        SharedModule,
        BoardsRoutingModule
    ],
    declarations: [
      CardPopUpInfoComponent
    ]
})
export class BoardsModule {
}
