import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {BoardsRoutingModule} from "./boards-routing.module";
import { OpenFileComponent } from './components/card-pop-up-info/open-file/open-file.component';

@NgModule({
    imports: [
        SharedModule,
        BoardsRoutingModule
    ],
    exports: [
    ],
    declarations: [
  
    OpenFileComponent
  ]
})
export class BoardsModule {
}
