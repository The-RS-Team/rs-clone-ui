import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {I18nModule} from "./i18n.module";
import {AutosizeModule} from 'ngx-autosize';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";

const commonModules = [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    AutosizeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    I18nModule,
    MatTabsModule
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
