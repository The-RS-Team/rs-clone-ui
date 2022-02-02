import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {BoardsService} from "../../boards.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BoardInterface} from "../../../../interfaces/board.interface";

@Component({
    selector: 'app-card-pop-up-info',
    templateUrl: './card-pop-up-info.component.html',
    styleUrls: ['./card-pop-up-info.component.scss']
})
export class CardPopUpInfoComponent implements OnInit {

    @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;

    public imageEl: HTMLImageElement | undefined;
    public files: File[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private http: HttpClient,
                private boardsService: BoardsService) {
    }

    ngOnInit(): void {
    }

    fileName = '';


    onFileSelected(event: Event) {

        // @ts-ignore
        const file: File = event.target?.files[0];

        this.boardsService.postFile(file ,this.data.id).subscribe(
            value => console.log('is the file upload?: ', value),
             error => console.log(error)
        );
    }

    // onFileSelected(event: Event) {
    //     // @ts-ignore
    //     const file: File = event.target?.files[0];
    //     this.files.push(file);
    //     this.imageEl = document.createElement('img')
    //     this.imageEl.src = URL.createObjectURL(file);
    //     // @ts-ignore
    //     URL.revokeObjectURL(file);
    // }
    //
    // openImg(fileName: string) {
    //     const img = this.files.find(el => el.name === fileName);
    // }
}
