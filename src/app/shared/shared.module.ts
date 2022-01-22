import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from '@ngx-translate/core';
import {I18nModule} from "./i18n.module";

const commonModules = [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    I18nModule
]

@NgModule({
    declarations: [],
    exports: [
        ...commonModules,

    ],
    imports: [
        ...commonModules,
    ]
})
export class SharedModule {
}
