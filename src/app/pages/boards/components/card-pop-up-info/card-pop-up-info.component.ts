import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {BoardsService} from "../../boards.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {OpenFileComponent} from "./open-file/open-file.component";
import {Subscription} from "rxjs";
import {BoardInterface} from "../../../../interfaces/board.interface";
import {FileInterface} from "../../../../interfaces/file.interface";

@Component({
    selector: "app-card-pop-up-info",
    templateUrl: "./card-pop-up-info.component.html",
    styleUrls: ["./card-pop-up-info.component.scss"],
})
export class CardPopUpInfoComponent implements OnInit {
    @ViewChild("descriptionTextarea") descriptionTextarea: ElementRef | undefined;
    @ViewChild("test") test: ElementRef | undefined;
    @ViewChild("link") link: ElementRef | undefined;

    public imageEl: HTMLImageElement | undefined;
    public files: any[] = [];

    public file: File | undefined;
    fileName = "";
    fileValue: any;

    private sub$ = new Subscription();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private sanitization: DomSanitizer,
        private http: HttpClient,
        private boardsService: BoardsService
    ) {
    }

    ngOnInit(): void {
        this.getFilesByCardId(this.data.id);
    }

    public convertFiles(files: any): void {

        files = files.map((file: any) => {
            if (!file) {
                return;
            }
            let binary = "";
            let bytes = new Uint8Array(file.buffer.data);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let src = window.btoa(binary);

            file.src = "data:" + file.mimetype + ";base64," + src;

            return file;
        });
    }

    openDialog(file: FileInterface) {
        if (
            file.mimetype.split("/")[0] !== "image" &&
            file.mimetype.split("/")[1] !== "pdf" &&
            file.mimetype.split("/")[0] !== "gif"
        ) {
            let downloadLink = document.createElement("a");
            var binaryData = [];
            binaryData.push(file);
            // console.log(binaryData, 'binary')
            downloadLink.href = window.URL.createObjectURL(
                // @ts-ignore
                new Blob(binaryData, {type: file.mimetype})
            );
            // console.log(new Blob(binaryData, {type: file.mimetype}), 'blob')
            // console.log(downloadLink, 'downlink')
            downloadLink.setAttribute("download", file.originalname);
            downloadLink.click();
            return;
        }
        const dialogRef = this.dialog.open(OpenFileComponent, {
            panelClass: "my-class",
            data: file,
        });

        dialogRef.afterClosed().subscribe((result) => {
        });
    }


    getFilesByCardId(id: string) {
        this.sub$.add(
            this.boardsService
                .getAllFiles(id)
                .subscribe((files) => {
                    this.files = files;
                    this.convertFiles(this.files);
                }));

    }


    getFile(id: any) {
        this.boardsService.getFileById(id).subscribe((blob) => {
            // this.convertFiles();
        });
    }

    onFileSelected(event: Event) {
        // @ts-ignore
        const file: File = event.target?.files[0];
        this.boardsService.postFile(file, this.data.id).subscribe(
            (value) => {
                // console.log("is the file upload?: ", value);
                this.fileValue = value;
                this.getFilesByCardId(this.data.id);
            },
            (error) => console.log(error)
        );
    }

    onDeleteFile(fileId: string): void {
        this.boardsService.deleteFile(fileId)
            .subscribe(
                (response) => {
                    this.getFilesByCardId(this.data.id)
                }
            )
    }

    public ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
