import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {BoardsService} from "../../boards.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subscription} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {OpenFileComponent} from "./open-file/open-file.component";

@Component({
    selector: 'app-card-pop-up-info',
    templateUrl: './card-pop-up-info.component.html',
    styleUrls: ['./card-pop-up-info.component.scss']
})
export class CardPopUpInfoComponent implements OnInit {

    @ViewChild('descriptionTextarea') descriptionTextarea: ElementRef | undefined;
    @ViewChild('test') test: ElementRef | undefined;

    public imageEl: HTMLImageElement | undefined;
    public files: File[] = [];

    public file: File | undefined;


    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private sanitization: DomSanitizer,
                private http: HttpClient,
                private boardsService: BoardsService) {
    }

    ngOnInit(): void {
        this.convertFiles();
    }

    fileName = '';
    fileValue: any;

    public convertFiles(): void {
        this.data.files = this.data.files.map((file: any) => {

            let binary = '';
            let bytes = new Uint8Array(file.buffer.data);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let src = window.btoa(binary);

            file.src = 'data:' + file.mimetype + ';base64,' + src;

            console.log(file)
            return file;
        })
    }

    openDialog(event: Event) {
        console.log(event, 'eventevent')
        // @ts-ignore
        const dialogRef = this.dialog.open(OpenFileComponent, {panelClass: 'my-class', data: event.srcElement?.currentSrc});

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getFile() {
        console.log(this.data, 'this.data')
        this.boardsService.getFileById(this.fileValue.id)
            .subscribe((fileBlob) => {


            })
    }


    onFileSelected(event: Event) {

        // @ts-ignore
        const file: File = event.target?.files[0];
        console.log(this.data.id, 'data.id')
        this.boardsService.postFile(file, this.data.id).subscribe(
            value => {
                console.log('is the file upload?: ', value);
                this.fileValue = value;
            },
            error => console.log(error)
        );
    }

    onDeleteFile(file: any): void {
        console.log('onDeletefile')
        console.log(file, 'onDeletefile, fileeee')
        console.log(file.id, 'onDeletefile, fileeee.iiiiiid')


        this.boardsService.deleteFile(this.fileValue.id)
            .subscribe(
                _ => {
                    console.log('next')
                    console.log(this.data.files, 'this.data.files')

                    // @ts-ignore
                    this.data.files = this.data.files.filter((el) => {
                            console.log(file.id, 'file.id');
                            // @ts-ignore
                            console.log(el.id, 'el.id');
                            // @ts-ignore
                            return el.id != file.toString();
                        }
                    )
                }
            )
    }
}
