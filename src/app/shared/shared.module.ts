import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
<<<<<<< HEAD
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
=======
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterModule} from "@angular/router";
>>>>>>> development

const commonModules = [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
<<<<<<< HEAD
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
=======
    RouterModule,
    ReactiveFormsModule,
    FormsModule
>>>>>>> development
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
