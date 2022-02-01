import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
    selector: 'app-card-pop-up-info',
    templateUrl: './card-pop-up-info.component.html',
    styleUrls: ['./card-pop-up-info.component.scss']
})
export class CardPopUpInfoComponent implements OnInit {

    @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;

    public imageEl: HTMLImageElement | undefined;
    public files: File[] = [];

    constructor(public dialog: MatDialog,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    onFileSelected(event: Event) {
        // @ts-ignore
        const file: File = event.target?.files[0];
        this.files.push(file);
        this.imageEl = document.createElement('img')
        this.imageEl.src = URL.createObjectURL(file);
        // @ts-ignore
        URL.revokeObjectURL(file);
    }

    openImg(fileName: string) {
        const img = this.files.find(el => el.name === fileName);
    }
}
