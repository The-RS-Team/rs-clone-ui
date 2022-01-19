import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterModule} from "@angular/router";
import {NewBoardComponent} from "../pages/new-board/new-board.component";
import {MatDialogModule} from "@angular/material/dialog";

const commonModules = [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
]

@NgModule({
    declarations: [NewBoardComponent],
    exports: [
        ...commonModules
    ],
    imports: [
        CommonModule,
        ...commonModules
    ]
})
export class SharedModule {
}