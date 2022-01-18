import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterModule} from "@angular/router";

const commonModules = [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
]

@NgModule({
    declarations: [],
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
